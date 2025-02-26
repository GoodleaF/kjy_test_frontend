<template>
    <div>
      <h1>제목: {{ board.title }}</h1>
      <p>내용: {{ board.content }}</p>
      <p>작성자: {{ board.writer }}</p>
      
      <h2>댓글</h2>
      <ul>
        <li v-for="comment in board.comments" :key="comment.idx">
          <p>
            <strong>{{ comment.writer }}:</strong> {{ comment.content }}
          </p>
        </li>
      </ul>
      
      <hr />
      <h2>댓글 등록</h2>
      <form @submit.prevent="registerComment">
        <div>
          <label for="commentWriter">작성자:</label>
          <input type="text" id="commentWriter" v-model="newComment.writer" required />
        </div>
        <div>
          <label for="commentContent">내용:</label>
          <textarea id="commentContent" v-model="newComment.content" required></textarea>
        </div>
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  
  export default {
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
          console.error('Error fetching board details:', error);
        }
      },
      async registerComment() {
        const boardId = this.$route.params.id;
        try {
          await api.post(`/board/${boardId}/register`, this.newComment);
          alert('댓글 작성 완료');
          this.fetchBoard();
          this.newComment.writer = '';
          this.newComment.content = '';
        } catch (error) {
          console.error('댓글 작성 실패:', error);
        }
      }
    }
  };
  </script>
  