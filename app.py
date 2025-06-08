from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
import datetime
import jwt
from functools import wraps

app = Flask(__name__)
CORS(app)

# Configuración
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fuerza_animal.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'fuerza_animal_secret_key'
app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(days=7)  

db = SQLAlchemy(app)

# Define models
class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    species = db.Column(db.String(100), nullable=False)
    breed = db.Column(db.String(100))
    age = db.Column(db.String(50))
    health_status = db.Column(db.String(100))
    training = db.Column(db.String(100))
    service_history = db.Column(db.Text)
    military_unit = db.Column(db.String(100))
    current_status = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    video_url = db.Column(db.String(255))  # Added video URL support
    rescue_center_id = db.Column(db.Integer, db.ForeignKey('rescue_center.id'))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    medical_records = db.relationship('MedicalHistory', backref='animal', lazy=True)
    adoptions = db.relationship('Adoption', backref='animal', lazy=True)
    incidents = db.relationship('Incident', backref='animal', lazy=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    bio = db.Column(db.Text)  # Added bio field
    profile_image = db.Column(db.String(255))  # Added profile image URL
    profile_video = db.Column(db.String(255))  # Added profile video URL
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    last_login = db.Column(db.DateTime)
    refresh_token = db.Column(db.String(500))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_tokens(self):
        # Access token
        access_token = jwt.encode({
            'user_id': self.id,
            'email': self.email,
            'is_admin': self.is_admin,
            'exp': datetime.datetime.utcnow() + app.config['JWT_EXPIRATION_DELTA']
        }, app.config['SECRET_KEY'])

        # Refresh token
        refresh_token = jwt.encode({
            'user_id': self.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
        }, app.config['SECRET_KEY'])

        self.refresh_token = refresh_token
        db.session.commit()

        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'bearer',
            'expires_in': app.config['JWT_EXPIRATION_DELTA'].total_seconds()
        }

class Responsible(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    rank = db.Column(db.String(100))
    contact = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    type = db.Column(db.String(100))
    date = db.Column(db.DateTime)
    description = db.Column(db.Text)
    result = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class Adoption(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    adopter_name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime)
    follow_up = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class MedicalHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    date = db.Column(db.DateTime)
    diagnosis = db.Column(db.Text)
    treatment = db.Column(db.Text)
    vet = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class RescueCenter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255))
    contact = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    animals = db.relationship('Animal', backref='rescue_center', lazy=True)

# Decorator para proteger rutas
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'error': 'Token inválido'}), 401

        if not token:
            return jsonify({'error': 'Token no proporcionado'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'error': 'Token inválido o expirado'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

# Creacion de base datos y tablas
with app.app_context():
    db.create_all()

# perfil de usuario
@app.route('/api/me/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    data = request.get_json()
    
    if 'bio' in data:
        current_user.bio = data['bio']
    if 'profile_image' in data:
        current_user.profile_image = data['profile_image']
    if 'profile_video' in data:
        current_user.profile_video = data['profile_video']
    if 'phone' in data:
        current_user.phone = data['phone']
    if 'address' in data:
        current_user.address = data['address']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Perfil actualizado exitosamente',
        'user': {
            'id': current_user.id,
            'firstName': current_user.first_name,
            'lastName': current_user.last_name,
            'email': current_user.email,
            'phone': current_user.phone,
            'address': current_user.address,
            'bio': current_user.bio,
            'profileImage': current_user.profile_image,
            'profileVideo': current_user.profile_video,
            'isAdmin': current_user.is_admin
        }
    })
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'El correo electrónico ya está registrado'}), 400
    
    user = User(
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        phone=data.get('phone'),
        address=data.get('address')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    tokens = user.generate_tokens()
    
    return jsonify({
        'message': 'Usuario registrado exitosamente',
        'user': {
            'id': user.id,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': user.email,
            'isAdmin': user.is_admin
        },
        **tokens
    }), 201
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Correo electrónico o contraseña incorrectos'}), 401
    
    # Actualizar último login
    user.last_login = datetime.datetime.utcnow()
    db.session.commit()
    
    tokens = user.generate_tokens()
    
    return jsonify({
        'user': {
            'id': user.id,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': user.email,
            'isAdmin': user.is_admin
        },
        **tokens
    })
@app.route('/api/refresh-token', methods=['POST'])
def refresh_token():
    refresh_token = request.json.get('refresh_token')
    if not refresh_token:
        return jsonify({'error': 'Refresh token no proporcionado'}), 401

    try:
        data = jwt.decode(refresh_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        user = User.query.get(data['user_id'])
        
        if not user or user.refresh_token != refresh_token:
            return jsonify({'error': 'Refresh token inválido'}), 401

        tokens = user.generate_tokens()
        return jsonify(tokens)
    except:
        return jsonify({'error': 'Refresh token inválido o expirado'}), 401
@app.route('/api/logout', methods=['POST'])
@token_required
def logout(current_user):
    current_user.refresh_token = None
    db.session.commit()
    return jsonify({'message': 'Sesión cerrada exitosamente'})

@app.route('/api/me', methods=['GET'])
@token_required
def get_user_profile(current_user):
    return jsonify({
        'id': current_user.id,
        'firstName': current_user.first_name,
        'lastName': current_user.last_name,
        'email': current_user.email,
        'phone': current_user.phone,
        'address': current_user.address,
        'bio': current_user.bio,
        'profileImage': current_user.profile_image,
        'profileVideo': current_user.profile_video,
        'isAdmin': current_user.is_admin,
        'lastLogin': current_user.last_login.isoformat() if current_user.last_login else None
    })

@app.route('/api/animals', methods=['GET'])
def get_animals():
    animals = Animal.query.all()
    result = []
    
    for animal in animals:
        result.append({
            'id': animal.id,
            'name': animal.name,
            'species': animal.species,
            'breed': animal.breed,
            'age': animal.age,
            'health_status': animal.health_status,
            'training': animal.training,
            'current_status': animal.current_status,
            'image_url': animal.image_url,
            'video_url': animal.video_url,
            'rescue_center_id': animal.rescue_center_id
        })
    
    return jsonify(result)

@app.route('/api/animals/<int:id>', methods=['GET'])
def get_animal(id):
    animal = Animal.query.get_or_404(id)
    
    # Get medical records
    medical_records = []
    for record in animal.medical_records:
        medical_records.append({
            'id': record.id,
            'date': record.date.strftime('%d/%m/%Y') if record.date else None,
            'diagnosis': record.diagnosis,
            'treatment': record.treatment,
            'vet': record.vet
        })
    
    # Get rescue center info
    rescue_center = None
    if animal.rescue_center:
        rescue_center = {
            'id': animal.rescue_center.id,
            'name': animal.rescue_center.name,
            'location': animal.rescue_center.location,
            'contact': animal.rescue_center.contact
        }
    
    result = {
        'id': animal.id,
        'name': animal.name,
        'species': animal.species,
        'breed': animal.breed,
        'age': animal.age,
        'health_status': animal.health_status,
        'training': animal.training,
        'service_history': animal.service_history,
        'military_unit': animal.military_unit,
        'current_status': animal.current_status,
        'image_url': animal.image_url,
        'video_url': animal.video_url,
        'medical_records': medical_records,
        'rescue_center': rescue_center
    }
    
    return jsonify(result)

@app.route('/api/rescue-centers', methods=['GET'])
def get_rescue_centers():
    centers = RescueCenter.query.all()
    result = []
    
    for center in centers:
        result.append({
            'id': center.id,
            'name': center.name,
            'location': center.location,
            'contact': center.contact
        })
    
    return jsonify(result)

@app.route('/api/sample-data', methods=['POST'])
def add_sample_data():
    # Add rescue centers
    center1 = RescueCenter(
        name="Centro Principal Fuerza Salvaje",
        location="Av. Principal #123, Ciudad Central",
        contact="info@fuerzaanimal.com | +1 234 567 890"
    )
    
    center2 = RescueCenter(
        name="Centro de Rescate Felino",
        location="Calle Secundaria #456, Ciudad Este",
        contact="felinos@fuerzaanimal.com | +1 234 567 891"
    )
    
    db.session.add(center1)
    db.session.add(center2)
    db.session.commit()
    
    # Add animals with video support
    animal1 = Animal(
        name="Max",
        species="Perro",
        breed="Pastor Alemán",
        age="3 años",
        health_status="Excelente",
        training="Básico",
        service_history="Max fue rescatado de una situación de abandono hace un año. Desde entonces ha recibido cuidados veterinarios completos y entrenamiento básico de obediencia.",
        current_status="Disponible",
        image_url="https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg",
        video_url="https://player.vimeo.com/external/373839467.sd.mp4?s=30d44b3a44ffad96bf9d4e8f29b4c50b255a7c0f&profile_id=164&oauth2_token_id=57447761",
        rescue_center_id=center1.id
    )
    
    animal2 = Animal(
        name="Luna",
        species="Gato",
        breed="Siamés",
        age="2 años",
        health_status="Buena",
        training="Básico",
        service_history="Luna fue encontrada en la calle cuando era una gatita de apenas 3 meses. Fue rescatada y llevada a nuestro centro donde recibió atención veterinaria.",
        current_status="Disponible",
        image_url="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
        video_url="https://player.vimeo.com/external/373839467.sd.mp4?s=30d44b3a44ffad96bf9d4e8f29b4c50b255a7c0f&profile_id=164&oauth2_token_id=57447761",
        rescue_center_id=center2.id
    )
    
    animal3 = Animal(
        name="Rocky",
        species="Perro",
        breed="Boxer",
        age="4 años",
        health_status="Buena",
        training="Avanzado",
        service_history="Rocky trabajó como perro de seguridad en una empresa durante 3 años. Debido a cambios en la empresa, fue donado a nuestro centro.",
        current_status="En proceso",
        image_url="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg",
        video_url="https://player.vimeo.com/external/373839467.sd.mp4?s=30d44b3a44ffad96bf9d4e8f29b4c50b255a7c0f&profile_id=164&oauth2_token_id=57447761",
        rescue_center_id=center1.id
    )
    
    db.session.add(animal1)
    db.session.add(animal2)
    db.session.add(animal3)
    db.session.commit()
    
    # Add medical records
    record1 = MedicalHistory(
        animal_id=animal1.id,
        date=datetime.datetime(2023, 1, 15),
        diagnosis="Chequeo general",
        treatment="Vacunas anuales",
        vet="Dr. Martínez"
    )
    
    record2 = MedicalHistory(
        animal_id=animal1.id,
        date=datetime.datetime(2023, 6, 20),
        diagnosis="Dermatitis leve",
        treatment="Champú medicado",
        vet="Dra. López"
    )
    
    record3 = MedicalHistory(
        animal_id=animal2.id,
        date=datetime.datetime(2023, 3, 10),
        diagnosis="Chequeo general",
        treatment="Vacunas y desparasitación",
        vet="Dra. Rodríguez"
    )
    
    db.session.add(record1)
    db.session.add(record2)
    db.session.add(record3)
    db.session.commit()
    
    # Add admin user with profile video
    admin = User(
        first_name="Admin",
        last_name="System",
        email="admin@fuerzaanimal.com",
        is_admin=True,
        profile_video="https://player.vimeo.com/external/373839467.sd.mp4?s=30d44b3a44ffad96bf9d4e8f29b4c50b255a7c0f&profile_id=164&oauth2_token_id=57447761"
    )
    admin.set_password("admin123")
    db.session.add(admin)
    db.session.commit()
    
    return jsonify({'message': 'Sample data added successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)