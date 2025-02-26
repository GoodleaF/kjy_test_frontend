<template>
  <div class="container">
    <h2>{{ board.title }}</h2>
    <p class="writer">작성자: {{ board.writer }}</p>
    <div class="detail-card">
    
      <p class="content">{{ board.content }}</p>
    </div>
    <div class="comments-section">
      <h2>댓글</h2>
      <ul>
        <li v-for="comment in board.comments" :key="comment.idx">
          <strong>{{ comment.writer }}:</strong> {{ comment.content }}
        </li>
      </ul>
    </div>
    <div class="register-comment">
      <form @submit.prevent="registerComment">
        <div class="form-group">
          <label for="commentWriter">작성자:</label>
          <input type="text" id="commentWriter" v-model="newComment.writer" required>
        </div>
        <div class="form-group">
          <label for="commentContent">내용:</label>
          <textarea id="commentContent" v-model="newComment.content" required></textarea>
        </div>
        <button type="submit" class="btn">댓글 작성</button>
      </form>
    </div>
    
  </div>
  <router-link class="btn register-btn" to="/">게시판으로 돌아가기</router-link>
</template>

<script>
import api from '@/api';

export default {
  name: 'DetailPage',
  data() {
    return {
      board: {
        comments: []
      },
      newComment: {
        writer: '',
        content: ''
      }
    };
  },
  mounted() {
    this.fetchBoard();
  },
  methods: {
    async fetchBoard() {
      const boardId = this.$route.params.id;
      try {
        const response = await api.get(`/board/${boardId}`);
        this.board = response.data;
      } catch (error) {
        console.error('게시글 로드 실패:', error);
      }
    },
    async registerComment() {
      const boardId = this.$route.params.id;
      try {
        await api.post(`/board/${boardId}/register`, this.newComment);
        alert('댓글 등록 성공!');
        this.fetchBoard();
        this.newComment.writer = '';
        this.newComment.content = '';
      } catch (error) {
        console.error('댓글 등록 실패:', error);
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

.detail-card {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 2rem;
  background-color: #fdfdfd;
}

.detail-card h2 {
  margin-bottom: 0.5rem;
  color: #007BFF;
}

.detail-card .content {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #555;
}

.detail-card .writer {
  font-style: italic;
  color: #888;
}

.comments-section {
  margin-bottom: 2rem;
}

.comments-section h2 {
  margin-bottom: 1rem;
  color: #333;
}

.comments-section ul {
  list-style-type: none;
  padding: 0;
}

.comments-section li {
  padding: 0.75rem;
  border-bottom: 1px solid #e0e0e0;
}

.register-comment {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fdfdfd;
}

.register-comment h2 {
  margin-bottom: 1rem;
  color: #333;
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
  padding: 0.75rem 1.5rem;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
