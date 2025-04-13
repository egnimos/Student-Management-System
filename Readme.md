# Student Management System

---

## Tech Stack

**Backend:**
- [Python 3](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org/) (Database)

**Frontend:**
- [Vue.js 3](https://vuejs.org/)
- [Axios](https://axios-http.com/) for HTTP requests
- [Bootstrap 5](https://getbootstrap.com/) for styling

---


## Setup Instructions

### Backend (Django)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/egnimos/Student-Management-System.git
   cd Student-Management-System/backend

2. **Create a Virtual Environment:**
   check for .venv folder if it is not present, then create a
   virtual enviroment
   ```bash
   python -m venv .venv

   # if the .venv folder is present then activate virtual enviroment

   # for Linux: 
   source venv/bin/activate  
   
   # On Windows: 
   venv\Scripts\activate

3. **Install all Dependencies:**
   ```
   pip install -r requirements.txt

4. **Navigate to "sms_backend" django project** and then follow the remaining steps

5. **Configure** the Postgress in the settings.py file you can create you own database and pass it to the **DATABASES**
   ```bash
   DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'smsdb', # you can change 
        'USER': '<enter your own user>',
        'PASSWORD': '<enter your own password>',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}

6. **Apply Migrations**
   ```bash
   python manage.py migrate

7. **Run Server**
   ```bash
   python manage.py runserver

### Frontend (Vue.js)

1. **Navigate to the frontend directory:**
    ```bash
    cd ../../frontend

2. **Install dependencies:**
   ```bash
   npm install

3. **Run the development server:**
   ```bash
   npm run dev

Vue app will run on **http://localhost:3000** and Django backend on **http://localhost:8000**.

### Issues (that I have faced during development)
1) Dropdown issue

### TODO's
1) Adding a File Validation like size and type check
2) Adding pdf reading support in vue.js
