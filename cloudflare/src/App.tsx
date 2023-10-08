import { useCallback, useState } from 'react'
import { Button, Selector, TextArea } from 'antd-mobile'
import './App.css'


const options = [
  {
    label: 'miniMax调用',
    value: '1',
  },
  {
    label: '百度AI调用',
    value: '2',
    disabled: true,
  },
]



const exampleText = `现在你需要批改学生的语文期末考试卷中的选择题部分。你需要将正确答案与学生的选择题答案进行比对，并给出总分。

以下为选择题的具体题目信息与答案解析：
<<<<
选择题（共5题，每题2分，共10分）

1. 下列选项中，哪个字的拼音是错误的？
   A. 苹果（pīng guǒ）
   B. 雨伞（yǔ sǎn）
   C. 学校（xué xiào）
   D. 游戏（yóu xì）
答案：A。解析：“苹果”的“苹”字的拼音应该是píng，而不是pīng。

2. 下列词语中，哪个词语含有错别字？
   A. 兴高采烈
   B. 自言自语
   C. 目不瑕接
   D. 斤斤计较
答案：C。解析：“目不瑕接”的“瑕”字应该是“暇”，正确的词语是“目不暇接”。

3. 下列句子中，哪个句子的修辞手法使用是错误的？
   A. 春风像母亲的手，温柔地抚摸着大地。（比喻）
   B. 雨下得真大，像天塌了似的。（夸张）
   C. 夜空中星星一闪一闪的，像小孩子的眼睛。（比喻）
   D. 老师的话像春风一样温暖。（拟人）
答案：D。解析：“老师的话像春风一样温暖”这句话把“老师的话”比作“春风”，使用的是比喻的修辞手法，而不是拟人。

4. 下列选项中，哪个词语与“悲伤”是近义词？
   A. 快乐
   B. 幸福
   C. 愉快
   D. 忧伤
答案：D。解析：“悲伤”的近义词是“忧伤”，它们都有表示心情难过的意思。

5. 下列诗句中，哪一句是描写春天的？
   A. 停车坐爱枫林晚，霜叶红于二月花。
   B. 接天莲叶无穷碧，映日荷花别样红。
   C. 千山鸟飞绝，万径人踪灭。
   D. 春色满园关不住，一枝红杏出墙来。
答案：D。解析：“春色满园关不住，一枝红杏出墙来”是描写春天的诗句，其他选项分别描写的是秋天、夏天和冬天。
>>>>

以下为选择题题目的标准答案：
<<<<
ACDDD
>>>>

以下为所有学生的选择题答案：
<<<<
小红：ACBDD
小方：ACDDD
小李：ACDDA
>>>>


现在请帮我批改所有学生的选择题，并以以下格式返回：
{"学生姓名":"","选择题得分":""}
要求批改严格参照标准答案、实事求是，不能随意捏造分数。`

function App() {
  const [text, setText] = useState('')
  const [platform, setPlatform] = useState()
  const [loading, setLoading] = useState(false)
  const fetchAPI = useCallback(async () => {
    const fetchData = await fetch('https://blog.aililuo.com/api/getminimaxai', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({content: text})
    });
    console.log(await fetchData.json())
  }, [text])

  return (
    <div className="App">
     <TextArea
      value={text}
      onChange={val => {
        setText(val)
      }}
      placeholder='请输入内容'
      showCount
      autoSize={{ minRows: 3, maxRows: 5 }}
     ></TextArea>
     <Selector
          options={options}
          defaultValue={['1']}
          onChange={(arr, extend) => setPlatform(arr[0])}
        />

        <Button block  onClick={() => setText(exampleText)}>
          输入默认测试文案
        </Button>
        <Button block loading={loading} color='primary' size='large' onClick={() => {
          setLoading(true);
          fetchAPI()
        }}>
          提交生成结果
        </Button>
    </div>
  )
}

export default App
