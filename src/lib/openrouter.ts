const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const YOUR_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const YOUR_SITE_NAME = 'AI Flashcards';

export async function generateFlashcards(topic: string): Promise<any> {
  const prompt = `Generate 5 flashcards about ${topic}. Each flashcard should have a question and an answer. Format the output as a JSON array of objects, each with 'question' and 'answer' properties.`;

  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": YOUR_SITE_URL,
        "X-Title": YOUR_SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.1-8b-instruct:free",
        "messages": [
          {"role": "user", "content": prompt},
        ],
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response error:', response.status, errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Unexpected API response format');
    }

    const content = data.choices[0].message.content;
    let parsedContent;
    try {
      // Extract JSON from the content
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        parsedContent = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('No JSON found in the response');
      }
    } catch (error) {
      console.error('Failed to parse JSON:', content);
      throw new Error('Failed to parse API response');
    }

    if (!Array.isArray(parsedContent)) {
      throw new Error('API response is not an array');
    }

    return parsedContent;
  } catch (error) {
    console.error('Error in generateFlashcards:', error);
    throw error;
  }
}