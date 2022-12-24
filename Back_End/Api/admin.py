from django.contrib import admin
from .models import Employee
# Register your models here.

class EmpAdmin(admin.ModelAdmin):
    list = ['name','email','phone','position']
    admin.site.register(Employee)
