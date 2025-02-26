<template>
    <div>
      <h1>게시판</h1>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>댓글 수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="component in components" :key="component.idx">
            <td>{{ component.idx }}</td>
            <td>{{ component.title }}</td>
            <td>{{ component.writer }}</td>
            <td>{{ component.comment_count }}</td>
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