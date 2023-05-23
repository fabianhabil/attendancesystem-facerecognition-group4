# Video Demonstrasi Program
[Video Demonstrasi](https://youtu.be/MqMZmHujUQA)
<br/>
[Proposal PKM-KC](https://drive.google.com/file/d/1LEYWWgyC_OhmwU8TkbhL9f2_X9iUsORG/view?usp=sharing)
# Cara install

## Installing Modules Backend
pip install requirements.txt

## Notes kalo error install module python (backend)
kalo dlibnya error
1. error cmake -> pip install cmake kalo gagal
2. kalo error dlib (windows pasti error) download di sini [Link Install dlib manual](https://github.com/datamagic2020/Install-dlib)
## Notes buat frontend
1. pastikan sudah punya node js di komputer
2. npm install --legacy-peer-deps
3. npm run dev (buat start dev server)

## Step by step backend
1. python manage.py makemigrations
2. python manage.py migrate
3. create admin user by python manage.py createsuperuser
4. python manage.py runserver and server running at port 8000

## Step by step frontend
1. buat file env dan masukkan url backend
2. npm run build
3. npm run start

## Flow using Attendee
1. Login superuser (Lecturer)
2. Bikin Course biar user biasa bisa absen
3. Register dan ikuti step by step di dashboard untuk save model
4. Absen!
