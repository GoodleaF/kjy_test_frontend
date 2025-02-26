<template>
    <div class="register-page">
      <h1>게시글 작성</h1>
      <form @submit.prevent="registerBoard">
        <div>
          <label for="title">제목:</label>
          <input type="text" id="title" v-model="board.title" required />
        </div>
        <div>
          <label for="content">내용:</label>
          <textarea id="content" v-model="board.content" required></textarea>
        </div>
        <div>
          <label for="writer">작성자:</label>
          <input type="text" id="writer" v-model="board.writer" required />
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  
  export default {
    name: "RegisterPage",
    data() {
      return {
        board: {
          title: "",
          content: "",
          writer: ""
        }
      };
    },
    methods: {
      async registerBoard() {
        try {
          await api.post("/board/register", this.board);
          alert("게시글 등록 완료");
          this.$router.push("/");
        } catch (error) {
          console.error("작성 실패:", error);
          alert("게시글 등록에 실패했습니다. 다시 시도해주세요.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  