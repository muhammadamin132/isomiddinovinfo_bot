export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message, callback_query } = req.body;
        const token = '9283172833:AAHirnEo3h-DTQakpRiqewAq73eSqRhvbPM'; 
        const adminChatId = '8832791564'; // Sizning shaxsiy Chat ID'ngiz
        const apiUrl = `https://api.telegram.org/bot${token}/`;

        // 1. START BUYRUG'I
        if (message && message.text === '/start') {
            const chatId = message.chat.id;
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Assalomu alaykum, ${message.from.first_name}!\n\nMuhammadamin Isomiddinovning rasmiy botiga xush kelibsiz! 🚀\n\nIltimos, avval sahifalarimizga obuna bo'ling va kerakli bo'limni tanlang:`,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "📢 Telegram Kanal", url: "https://t.me/muhammadamin_isomiddinovx" }],
                            [{ text: "📸 Instagram", url: "https://www.instagram.com/muhammadamin__officiall/" }],
                            [{ text: "👤 Shaxsiy Telegram", url: "https://t.me/Muhammadaminofficial" }],
                            [{ text: "💻 Web Sayt buyurtma qilish", callback_data: "order_web" }],
                            [{ text: "🎬 AI Video buyurtma qilish", callback_data: "order_ai" }]
                        ]
                    }
                })
            });
        }

        // 2. WEB SAYT TANLANGANDA
        if (callback_query && callback_query.data === 'order_web') {
            const chatId = callback_query.message.chat.id;
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Ajoyib! Qanday sayt kerakligini va loyihangiz haqida qisqacha ma'lumot yozing (javobingizni pastdagi qutiga yozing):",
                    reply_markup: {
                        force_reply: true // Mijoz javob yozishi uchun maxsus quti chiqadi
                    }
                })
            });
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
        }

        // 3. AI VIDEO TANLANGANDA
        if (callback_query && callback_query.data === 'order_ai') {
            const chatId = callback_query.message.chat.id;
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Zo'r! AI video uchun qanday mavzu, rasm yoki video kerakligini batafsil yozing (javobingizni pastdagi qutiga yozing):",
                    reply_markup: {
                        force_reply: true
                    }
                })
            });
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
        }

        // 4. MIJOZ XABAR YOZGANDA (Web yoki AI uchun)
        if (message && message.text && message.text !== '/start') {
            const chatId = message.chat.id;
            const userName = message.from.first_name;
            const userText = message.text;

            // Mijozga javob
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Xabaringiz qabul qilindi! Tez orada Muhammadamin siz bilan bog'lanadi.",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "👤 Shaxsiy Telegramga o'tish", url: "https://t.me/Muhammadaminofficial" }]
                        ]
                    }
                })
            });

            // Sizga (Adminga) xabar yuborish
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: adminChatId,
                    text: `🔔 YANGI BUYURTMA!\n\n👤 Mijoz: ${userName}\n💬 Xabar: ${userText}\n\nMijoz bilan bog'lanish uchun uning chatiga o'ting yoki shaxsiy profilingizni tekshiring.`
                })
            });
        }

        res.status(200).json({ status: 'ok' });
    } else {
        res.status(200).json({ status: 'Bot is running' });
    }
}
