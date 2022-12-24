from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .serializers import EmployeeSerializers
from .models import Employee
from django.contrib import messages
from rest_framework import status
from rest_framework.filters import SearchFilter
# Create your views here.

@api_view(['GET'])      # decorators which takes a list of http methods by default only get method will accept
def apiOverview(request):

    api_urls = {
        'List' : '/emp-list',
        'Details' : '/emp-detail/<str:pk>/',
        'create' : '/emp-create/',
        'Update' : '/emp-update/<str:pk>/',
        'Delete' : '/emp-delete/<str:pk>'
    }

    return Response(api_urls)

@api_view(['GET'])
def empList(request):
    employee = Employee.objects.all()  # fetching all the data from Employee model
    serializer = EmployeeSerializers(employee, many=True)   
    return Response(serializer.data)

@api_view(['GET'])
def empDetail(request,pk):
    employee = Employee.objects.get(id = pk)    # fetching id from db using get method
    serializer = EmployeeSerializers(employee, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def empCreate(request):
    # email = request.POST['email']
    email = request.data['email']
    phone = request.data['phone']

    serializer = EmployeeSerializers(data=request.data)
    if serializer.is_valid():
        check = Employee.objects.filter(email = email) and Employee.objects.filter(phone = phone).exists()
        if check:
            content = {'error' : "Email and phone already Regitered!!"}
            return Response(content,status=status.HTTP_403_FORBIDDEN)
        else:
            serializer.save()
            return Response(request, status=status.HTTP_201_CREATED)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def empUpdate(request,pk):
    employee = Employee.objects.get(id = pk)
    serializer = EmployeeSerializers(instance=employee, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def empDelete(request,pk):
    employee = Employee.objects.get(id = pk)
    employee.delete()

    return Response('Employee Deleted Successfully')


# @api_view(['GET'])
# def empSearch(request):
#     employee = Employee.objects.all()
#     filter_backend = [SearchFilter]
#     search_fields = ["phone","name"]
#     return Response(search_fields)
