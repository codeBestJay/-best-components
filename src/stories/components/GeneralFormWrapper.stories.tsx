import type { Meta, StoryObj } from "@storybook/react";
import { GeneralFormWrapper } from "../../index";
import React from "react";
import { withRouter } from 'storybook-addon-react-router-v6';
import { Form, Input, TableProps, Button } from "antd";

const meta = {
  title: '详情返回布局/GeneralFormWrapper',
  component: GeneralFormWrapper,
  decorators: [withRouter],
  tags: ["autodocs"],
  argTypes: {
    handleNavigate: {
      description: "返回路由事件定义，navigate(url) 或 navigate(-1)，暴露在外部",
    }
  }
} satisfies Meta<typeof GeneralFormWrapper>

export default meta;
type Story = StoryObj<typeof meta>;

export const wrapperExample: Story = {
  args: {
    hideBack: false,
		showTitle: true,
		title: "我的企业",
    to: 'https://4x.ant.design/components/cascader-cn/',
    footer: true,
    footerExtra: [
      <Button key="submit" type="primary">
        确定
      </Button>,
      <Button key="cancel">
        取消
      </Button>,
    ],
    expAction:[undefined,<Button>111</Button>],
    children: <div style={{ height: '100px' }}>
      <div>集美们有bug稍微默默优化下～</div>
      <div>“当代中国青年是与新时代同向同行、共同前进的一代，生逢盛世，肩负重任。广大青年要爱国爱民，从党史学习中激发信仰、获得启发、汲取力量，不断坚定‘四个自信’，不断增强做中国人的志气、骨气、底气，树立为祖国为人民永久奋斗、赤诚奉献的坚定理想。”今年4月19日，习近平总书记在清华大学考察时指出。

        爱国，是人世间最深层、最持久的情感，是一个人立德之源、立功之本。爱国主义是我们民族精神的核心，是中华民族团结奋斗、自强不息的精神纽带。中国共产党是爱国主义精神最坚定的弘扬者和实践者，100年来，我们党团结带领全国各族人民进行的革命、建设、改革实践，是爱国主义的伟大实践，写下了中华民族爱国主义精神的辉煌篇章。

        党的十八大以来，以习近平同志为核心的党中央高度重视爱国主义教育，固本培元、凝心铸魂，作出一系列重要部署，推动爱国主义教育取得显著成效。习近平总书记关于弘扬爱国主义精神的重要论述，站位高远，内涵丰富，思想深邃，对于振奋民族精神、凝聚全民族力量，实现“两个一百年”奋斗目标、实现中华民族伟大复兴的中国梦，具有重大而深远的意义。

        爱国主义是我们民族精神的核心，是中国人民和中华民族同心同德、自强不息的精神纽带</div>
      <div>“当代中国青年是与新时代同向同行、共同前进的一代，生逢盛世，肩负重任。广大青年要爱国爱民，从党史学习中激发信仰、获得启发、汲取力量，不断坚定‘四个自信’，不断增强做中国人的志气、骨气、底气，树立为祖国为人民永久奋斗、赤诚奉献的坚定理想。”今年4月19日，习近平总书记在清华大学考察时指出。

        爱国，是人世间最深层、最持久的情感，是一个人立德之源、立功之本。爱国主义是我们民族精神的核心，是中华民族团结奋斗、自强不息的精神纽带。中国共产党是爱国主义精神最坚定的弘扬者和实践者，100年来，我们党团结带领全国各族人民进行的革命、建设、改革实践，是爱国主义的伟大实践，写下了中华民族爱国主义精神的辉煌篇章。

        党的十八大以来，以习近平同志为核心的党中央高度重视爱国主义教育，固本培元、凝心铸魂，作出一系列重要部署，推动爱国主义教育取得显著成效。习近平总书记关于弘扬爱国主义精神的重要论述，站位高远，内涵丰富，思想深邃，对于振奋民族精神、凝聚全民族力量，实现“两个一百年”奋斗目标、实现中华民族伟大复兴的中国梦，具有重大而深远的意义。

        爱国主义是我们民族精神的核心，是中国人民和中华民族同心同德、自强不息的精神纽带</div>
    </div>
  }
}