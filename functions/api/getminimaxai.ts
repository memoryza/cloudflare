export async function onRequest(context) {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  const group_id = '1696747114722983';
  const api_key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiZWR1IiwiU3ViamVjdElEIjoiMTY5Njc0NzExNDE5NjY3MiIsIlBob25lIjoiTVRNMU5USTFPREkxTlRNPSIsIkdyb3VwSUQiOiIxNjk2NzQ3MTE0NzIyOTgzIiwiUGFnZU5hbWUiOiIiLCJNYWlsIjoiamluY2FpLndhbmdAZm94bWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyMy0xMC0wOCAxNjozMToyMSIsImlzcyI6Im1pbmltYXgifQ.h8wU0oqFSSuQJ7PF_ztPHoeqpdNL-63PyAKeE-Ym0OMPW-blgmjKOklrg3akZ-PLFIT0-UUeY7We8u0F0JSP647NYDV6is3G-WCuH4ef1SMmSjvxGVtWIqzwrqsdzsj42drg2Z2UrlmuQAHLmL2EijpQK-Z0wI_h-mj20x0E7TGbYZQEQhHcBEVaVxGZQ2PohZEkKpB7DiVXKc-Boy_pAp_vNB5UM_67hlgTisJDmYoVXuJygWBjhgVyP6rCINlvihwsCITOfpB4Oz9J3Ig5zj0an2D7vmo8SDtj_dVaXunbrDTmeODU8RUJi7X5TLMXpEFU7wtBj9PC_PsEhHLtIg';
  const requestBody = {
    "model": "abab5.5-chat",
    "tokens_to_generate": 256,
    "temperature": 0.9,
    "top_p": 0.95,
    "stream": false,
    "role_meta": {
      "user_name": "用户",
      "bot_name": "MM智能助理"
    },
    "prompt": "MM智能助理是一款由MiniMax自研的，没有调用其他产品的接口的大型语言模型。MiniMax是一家中国科技公司，一直致力于进行大模型相关的研究。\n----",
    "messages": [
      {
        "sender_type": "USER",
        "text": params.content,
      }
    ]
  }
    const data = await fetch(`https://api.minimax.chat/v1/text/chatcompletion?GroupId=${group_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api_key}`,
      },
      body: JSON.stringify(requestBody)
    })
    const repData = await data.json()
    return new Response(JSON.stringify({...repData, paramsW: params}), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
}