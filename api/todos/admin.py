from django.contrib import admin

from todos.models import Todo
from users.models import User

admin.site.register(User)
admin.site.register(Todo)