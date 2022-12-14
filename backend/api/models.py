from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.timezone import now

# Create your models here.


class UserManager(BaseUserManager):

    def create_user(self,  email, password=None, **extra_fields):
        """Create and return a `User` with an email, phone number, username and password."""
        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')

        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True, default='Email')
    password = models.CharField(
        max_length=100, blank=False, null=False, default="password")
    fullname = models.CharField(max_length=100, null=False, default="password")
    nim = models.CharField(max_length=100, null=False, default="password")
    haveModel = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True, null=True)
    is_staff = models.BooleanField(default=False, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password', 'fullname',
                       'nim']

    objects = UserManager()

    def __str__(self):
        return f"{self.fullname}"


class Image(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to=f'models/', null=True)


class ImageAbsent(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='tempimages/')


class Course(models.Model):
    name = models.CharField(max_length=50)
    sks = models.IntegerField()


class Attendance(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    courseId = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    time = models.DateTimeField(auto_now_add=True, blank=True)

    
