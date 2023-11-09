<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question" @change="tabChanges">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
          <a-tab-pane key="record" title="提交记录">
            <a-list>
              <a-list-item v-for="idx in 4" :key="idx">
                <a-list-item-meta
                  title="Beijing Bytedance Technology Co., Ltd."
                  description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
                >
                  <template #avatar>
                    <a-avatar shape="square">
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                </a-list-item-meta>
                <template #actions>
                  <icon-edit />
                  <icon-delete />
                </template>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="changeCode"
          code-default="aaaa"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { QuestionVO } from "@/api/models/QuestionVO";
import { QuestionControllerService } from "@/api/services/QuestionControllerService";
import { QuestionSubmitAddRequest } from "@/api/models/QuestionSubmitAddRequest";
import { BaseResponse_Page_QuestionSubmitVO_ } from "@/api/models/BaseResponse_Page_QuestionSubmitVO_";

const question = ref<QuestionVO>();
const record = ref<BaseResponse_Page_QuestionSubmitVO_>();

interface Props {
  id: string;
}

/**
 * 当tabs标签变化时
 * @param key
 */
const tabChanges = async (key: string) => {
  if (key === "record") {
    const res =
      await QuestionControllerService.listQuestionSubmitByPageUsingPost({
        userId: question.value?.userId,
        questionId: question.value?.id,
        sortField: "createTime",
        sortOrder: "descend",
      });
    if (res.code === 0) {
      record.value = res.data;
    } else {
      message.error("加载失败，" + res.message);
    }
  }
};

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code:
    "public class Main{\n" +
    "    public static void main(String[] args){\n" +
    "        Scanner sc = new Scanner(System.in);\n" +
    "        int a = sc.nextInt();\n" +
    "        int b = sc.nextInt();\n" +
    "        // 请输入你的代码 \n" +
    "    }\n" +
    "}",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
