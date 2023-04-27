from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class MyUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email ,password=None):
        if not email:
            raise ValueError("Users must have an email address")
        email=self.normalize_email(email)
        email=email.lower()
        user = self.model(
            email=email,
            first_name=first_name,
            last_name =last_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email,first_name,last_name, password=None):
      
        user = self.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )
        user.is_staff = True
        user.is_superuser= True
        user.save(using=self._db)
        return user
class UserAccount(AbstractBaseUser,PermissionsMixin):
    first_name = models.CharField(
        max_length=255,
    )    
    last_name = models.CharField(
        max_length=255,
    )    
    email = models.EmailField(
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin