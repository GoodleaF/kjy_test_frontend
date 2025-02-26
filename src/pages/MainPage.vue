<template>
    <div>
      <h1>게시판</h1>
      <ul>
        <li v-for="board in boards" :key="board.idx">
          <router-link :to="`/page/${board.idx}`">
            {{board.idx}} {{ board.title }} {{board.writer}} (댓글 수: {{ board.commentCount }} )
          </router-link>
        </li>
      </ul>
      <hr />
      <h2>게시글 작성</h2>
      <form @submit.prevent="registerBoard">
        <div>
          <label for="title">제목:</label>
          <input type="text" id="title" v-model="newBoard.title" required />
        </div>
        <div>
          <label for="content">내용:</label>
          <textarea id="content" v-model="newBoard.content" required></textarea>
        </div>
        <div>
          <label for="writer">작성자:</label>
          <input type="text" id="writer" v-model="newBoard.writer" required />
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  
  export default {
    data() {
      return {
        boards: [],
        page: 0,
        size: 10,
        newBoard: {
          title: '',
          content: '',
          writer: ''
        }
      };
    },
    mounted() {
      this.fetchBoards();
    },
    methods: {
      async fetchBoards() {
        try {
          const response = await api.get('/board/list', {
            params: {
              page: this.page,
              size: this.size
            }
          });
          this.boards = response.data;
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      },
      async registerBoard() {
        try {
          await api.post('/board/register', this.newBoard);
          alert('게시글 작성 완료');
          this.fetchBoards();
          this.newBoard.title = '';
          this.newBoard.content = '';
          this.newBoard.writer = '';
        } catch (error) {
          console.error('작성 실패:', error);
        }
      }
    }
  };
  </script>
  