<template>
  <div class="container">
    <h1>게시글 등록</h1>
    <div class="register-card">
      <form @submit.prevent="registerBoard">
        <div class="form-group">
          <label for="title">제목:</label>
          <input type="text" id="title" v-model="board.title" required>
        </div>
        <div class="form-group">
          <label for="content">내용:</label>
          <textarea id="content" v-model="board.content" required></textarea>
        </div>
        <div class="form-group">
          <label for="writer">작성자:</label>
          <input type="text" id="writer" v-model="board.writer" required>
        </div>
        <button type="submit" class="btn">게시글 등록</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'RegisterPage',
  data() {
    return {
      board: {
        title: '',
        content: '',
        writer: ''
      }
    };
  },
  methods: {
    async registerBoard() {
      try {
        await api.post('/board/register', this.board);
        alert('게시글 등록 성공!');
        this.$router.push('/');
      } catch (error) {
        console.error('게시글 등록 실패:', error);
      }
    }
  }
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

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.register-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fdfdfd;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
