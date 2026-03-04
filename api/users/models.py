from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    REQUIRED_FIELDS = [ 'password' ,'email']

    def __str__(self):
        return self.username