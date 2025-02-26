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
      <router-link to="/register">게시글 작성하기</router-link>
      
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
      }
    }
  };
  </script>
  