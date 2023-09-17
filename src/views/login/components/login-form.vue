<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ titleContent }}</div>
    <!--    <div class="login-form-sub-title">欢迎登录</div>-->
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <div v-if="formStatus">
        <a-form-item
          field="username"
          :rules="[{ required: true, message: '用户名不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input v-model="userInfo.username" placeholder="请输入用户名">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          field="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input-password
            v-model="userInfo.password"
            placeholder="请输入密码"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
      </div>
      <a-space :size="16" direction="vertical">
        <div v-if="formStatus" class="login-form-password-actions">
          <a-checkbox
            :default-checked="rememberPassword"
            @change="setRememberPassword"
          >
            记住我
          </a-checkbox>
          <a-link>忘记密码?</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          登录
        </a-button>
        <a-button
          type="text"
          long
          class="login-form-register-btn"
          @click="changeForm"
        >
          注册账号
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ValidatedError } from "@arco-design/web-vue/es/form/interface";
import { useStore } from "vuex";
import useLoading from "@/hooks/loading";

const rememberPassword = ref(true);
const router = useRouter();
const errorMessage = ref("");
//表单状态、用于判断是登录功能还是注册功能
const formStatus = ref(true);
const { loading, setLoading } = useLoading();
const userStore = useStore();
const titleContent = ref(" 在线判题OJ系统 ");

const userInfo = reactive({
  username: "admin",
  password: "admin",
});

/**
 * 登录：处理提交请求
 * @param errors
 * @param values
 */
const handleSubmit = async ({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined;
  values: Record<string, any>;
}) => {
  console.log(values);
  if (loading.value) return;
  if (!errors) {
    setLoading(true);
    try {
      // await userStore.login(values as LoginData);
      // const { redirect, ...othersQuery } = router.currentRoute.value.query;
      // router.push({
      //   name: (redirect as string) || "Workplace",
      //   query: {
      //     ...othersQuery,
      //   },
      // });
      // Message.success(t("login.form.login.success"));
      // const { rememberPassword } = loginConfig.value;
      // const { username, password } = values;
      // // 实际生产环境需要进行加密存储。
      // // The actual production environment requires encrypted storage.
      // loginConfig.value.username = rememberPassword ? username : "";
      // loginConfig.value.password = rememberPassword ? password : "";
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  }
};
const setRememberPassword = (value: boolean) => {
  console.log(value);
};

const changeForm = () => {
  if (formStatus.value) {
    //如果为真，表明当前为登录页面，需要切换到注册页面
    titleContent.value = "注册";
    formStatus.value = false;
  } else {
    titleContent.value = "在线判题OJ系统";
    formStatus.value = true;
  }
};
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    align-items: center;
    text-align: center;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
