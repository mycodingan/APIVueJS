<template>
  <div>
    <router-link to="/create" class="btn btn-secondary">Add data</router-link>
  </div>
  <div class="container mt-4">
    <div class="row">
      <div v-for="student in students" :key="student.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ student.name }}</h5>
            <p class="card-text">email: {{ student.email }}</p>
            <router-link :to="{ name: 'editStudent', params: { id: student.id } }"
              class="btn btn-primary m-3">Edit</router-link>
            <button @click="deleteStudent(student.id)" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const students = ref([]);

const fetchStudents = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get('http://192.168.11.149:8000/api/users/', {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    console.log(response);
    students.value = response.data.data;
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

const deleteStudent = async (studentId) => {
  try {
    const token = localStorage.getItem('accessToken');
    await axios.delete(`http://192.168.11.149:8000/api/users/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Student deleted successfully!');
    fetchStudents();
  } catch (error) {
    console.error('Error deleting student:', error);
    alert('Failed to delete student. Please try again.');
  }
};

onMounted(fetchStudents);
</script>