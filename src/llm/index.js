const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const KIMI_CHAT_API_URL = "https://api.moonshot.cn/v1/chat/completions"

// 普通非流式调用
export const chat = async (
    messages , 
    api_url= KIMI_CHAT_API_URL, 
    api_key=import.meta.env.VITE_KIMI_API_KEY,
    model = "kimi-k2-0711-preview",
) => {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: model,
                messages,
                stream: false,
            })
        })
        const data = await response.json();
        return {
            code: 0,
            data: {
                role: 'assistant',
                content: data.choices[0].message.content
            }
        }
    } catch (err) {
        return {
            code: 0,
            msg: '出错了...'
        }
    }
}

// 新增流式调用函数
export const streamChat = async (
    messages,
    onChunk,
    onComplete,
    onError,
    api_url= KIMI_CHAT_API_URL,
    api_key=import.meta.env.VITE_KIMI_API_KEY,
    model = "kimi-k2-0711-preview",
) => {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: model,
                messages,
                stream: true,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            // 处理每个SSE块
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line === 'data: [DONE]') {
                    onComplete(accumulatedContent);
                    return;
                }

                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6));
                        if (data.choices && data.choices[0] && data.choices[0].delta) {
                            const content = data.choices[0].delta.content || '';
                            accumulatedContent += content;
                            onChunk(content, accumulatedContent);
                        }
                    } catch (e) {
                        console.error('Error parsing stream chunk:', e);
                    }
                }
            }
        }

        onComplete(accumulatedContent);
    } catch (err) {
        console.error('Stream chat error:', err);
        onError(err);
    }
}