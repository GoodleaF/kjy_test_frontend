<template>
  <div class="container">
    <div class="header">
      <h1>게시판</h1>
      
    </div>
    <table class="board-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>댓글</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in boards" :key="board.idx">
          <td>{{ board.idx }}</td>
          <td>
            <router-link :to="`/page/${board.idx}`">
              {{ board.title }}
            </router-link>
          </td>
          <td>{{ board.writer }}</td>
          <td>{{ board.commentCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <router-link class="btn register-btn" to="/register">게시글 작성</router-link>
</template>

<script>
import api from '@/api';

export default {
  name: 'MainPage',
  data() {
    return {
      boards: [],
      page: 0,
      size: 10,
    };
  },
  mounted() {
    this.fetchBoards();
  },
  methods: {
    async fetchBoards() {
      try {
        const response = await api.get('/board/list', {
          params: { page: this.page, size: this.size },
        });
        this.boards = response.data;
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: center; 
  align-items: center;
  margin-bottom: 1rem;
}


h1 {
  margin: 0;
  color: #333;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.btn.register-btn {
  padding: 0.5rem 1rem;
  background-color: #007BFF;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
}

.btn.register-btn:hover {
  background-color: #0056b3;
}

.board-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.board-table th,
.board-table td {
  padding: 1rem;
  text-align: left;
}

.board-table th {
  background-color: #007BFF;
  color: #fff;
  font-weight: bold;
}

.board-table td {
  border-bottom: 1px solid #e0e0e0;
}

.board-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.board-table tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s ease;
}

a {
  color: #007BFF;
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}
</style>
