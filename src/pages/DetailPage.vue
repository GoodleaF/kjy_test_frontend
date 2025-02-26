<template>
    <div>
      <h1>Board Components</h1>
      <table>
        <thead>
          <tr>
            <th>Idx</th>
            <th>Title</th>
            <th>Content</th>
            <th>Writer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="component in components" :key="component.idx">
            <td>{{ component.idx }}</td>
            <td>{{ component.title }}</td>
            <td>{{ component.content }}</td>
            <td>{{ component.writer }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        components: []
      };
    },
    created() {
      this.fetchComponents();
    },
    methods: {
      async fetchComponents() {
        try {
          const response = await fetch('https://your-backend-api.com/components');
          const data = await response.json();
          this.components = data;
        } catch (error) {
          console.error('Error fetching components:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>