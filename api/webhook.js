export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message, callback_query } = req.body;
        const token = '9283172833:AAHirnEo3h-DTQakpRiqewAq73eSqRhvbPM'; 
        const adminChatId = '8832791564';
        const apiUrl = `https://api.telegram.org/bot${token}/`;

        // 1. START BUYRUG'I (Majburiy obuna)
        if (message && message.text === '/start') {
            const chatId = message.chat.id;
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Assalomu alaykum, ${message.from.first_name}!\n\nBotdan foydalanish uchun, iltimos, avval quyidagi sahifalarimizga obuna bo'ling:`,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "📢 Telegram Kanal", url: "https://t.me/muhammadamin_isomiddinovx" }],
                            [{ text: "📸 Instagram", url: "https://www.instagram.com/muhammadamin__officiall/" }],
                            [{ text: "✅ Obuna bo'ldim, davom etish", callback_data: "check_sub" }] // Asosiy menyuga o'tish
                        ]
                    }
                })
            });
        }

        // 2. OBUNA BO'LDIM TUGMASI BOSILGANDA (Asosiy Menyu)
        if (callback_query && callback_query.data === 'check_sub') {
            const chatId = callback_query.message.chat.id;
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Rahmat! Asosiy menyuga xush kelibsiz. Kerakli bo'limni tanlang:`,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "💻 Web Sayt (Bepul maslahat)", callback_data: "order_web" }],
                            [{ text: "🎬 AI Video (Bepul maslahat)", callback_data: "order_ai" }],
                            [{ text: "💎 PREMIUM XIZMATLAR (VIP)", callback_data: "premium_info" }],
                            [{ text: "👤 Shaxsiy Telegram", url: "https://t.me/Muhammadaminofficial" }]
                        ]
                    }
                })
            });
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
        }

        // 3. PREMIUM TUGMASI BOSILGANDA
        if (callback_query && callback_query.data === 'premium_info') {
            const chatId = callback_query.message.chat.id;
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `💎 **PREMIUM XIZMATLAR (VIP)** 💎\n\nPremium mijozlar uchun:\n✅ Navbatsiz, ustuvor xizmat\n✅ 3D animatsiyali eksklyuziv saytlar\n✅ 4K formatdagi AI videolar\n✅ 24/7 shaxsiy qo'llab-quvvatlash\n\n💳 **Narxi:** Loyiha hajmiga qarab kelishiladi.\n\nTo'lov va batafsil ma'lumot uchun shaxsiy Telegramimizga yozing:`,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "👑 Premium buyurtma berish", url: "https://t.me/Muhammadaminofficial" }]
                        ]
                    }
                })
            });
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
        }

        // 4. WEB SAYT TANLANGANDA
        if (callback_query && callback_query.data === 'order_web') {
            const chatId = callback_query.message.chat.id;
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Ajoyib! Qanday sayt kerakligini va loyihangiz haqida qisqacha ma'lumot yozing:",
                    reply_markup: { force_reply: true }
                })
            });
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
        }

        // 5. AI VIDEO TANLANGANDA
        if (callback_query && callback_query.data === 'order_ai') {
            const chatId = callback_query.message.chat.id;
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Zo'r! AI video uchun qanday mavzu va rasm kerakligini yozing:",
                    reply_markup: { force_reply: true }
                })
            });
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
        }

        // 6. MIJOZ XABAR YOZGANDA (Buyurtma matni)
        if (message && message.text && message.text !== '/start') {
            const chatId = message.chat.id;
            const userName = message.from.first_name;
            const userText = message.text;

            // Mijozga tasdiqlash xabari
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Xabaringiz qabul qilindi! Tez orada javob beramiz.",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "👤 Shaxsiy Telegramga o'tish", url: "https://t.me/Muhammadaminofficial" }]
                        ]
                    }
                })
            });

            // Adminga (sizga) xabar yuborish
            await fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: adminChatId,
                    text: `🔔 YANGI BUYURTMA!\n\n👤 Mijoz: ${userName}\n💬 Xabar: ${userText}`
                })
            });
        }

        res.status(200).json({ status: 'ok' });
    } else {
        res.status(200).json({ status: 'Bot is running' });
    }
}
