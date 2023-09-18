import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/NoAuthView.vue";
// import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginIndex from "@/views/login/LoginIndex.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginIndex,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/questions",
  //   name: "浏览题目",
  //   component: QuestionsView,
  // },
  // {
  //   path: "/question_submit",
  //   name: "浏览题目提交",
  //   component: QuestionSubmitView,
  // },
  // {
  //   path: "/view/question/:id",
  //   name: "在线做题",
  //   component: ViewQuestionView,
  //   props: true,
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/add/question",
  //   name: "创建题目",
  //   component: AddQuestionView,
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //   },
  // },
  // {
  //   path: "/update/question",
  //   name: "更新题目",
  //   component: AddQuestionView,
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/manage/question/",
  //   name: "管理题目",
  //   component: ManageQuestionView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/",
  //   name: "主页",
  //   component: QuestionsView,
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
];
