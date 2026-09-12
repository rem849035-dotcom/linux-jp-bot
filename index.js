const {
    Client,
    GatewayIntentBits,
    ChannelType,
    PermissionsBitField
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", () => {
    console.log(`Bot起動：${client.user.tag}`);
});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    if (message.content !== "!onon") return;

    if (!message.guild) return;

    if (!message.member.permissions.has(
        PermissionsBitField.Flags.ManageGuild
    )) {
        return message.reply(
            "❌ このコマンドを使う権限がありません。"
        );
    }

    await message.reply(
        "⚙️ Linux_jpのチャンネルを作成しています..."
    );

    const categories = {
        "📌 INFORMATION": [
            "📢｜お知らせ",
            "📜｜ルール",
            "👋｜自己紹介",
            "📝｜サーバー案内",
            "🔗｜リンク"
        ],

        "💬 COMMUNITY": [
            "💬｜雑談",
            "🎮｜ゲーム",
            "📸｜スクリーンショット",
            "🎵｜音楽",
            "😂｜ミーム",
            "🤖｜botコマンド"
        ],

        "🎮 GAMING": [
            "🎮｜ゲーム募集",
            "🏆｜戦績",
            "💡｜攻略・質問",
            "🔥｜クリップ",
            "🐛｜バグ報告"
        ],

        "💻 DEVELOPMENT": [
            "💻｜プログラミング",
            "🐧｜Linux",
            "🛠️｜制作物",
            "💡｜アイデア",
            "❓｜質問"
        ],

        "📢 CONTENT": [
            "🎨｜作品紹介",
            "🎬｜動画",
            "📷｜画像",
            "📣｜宣伝"
        ],

        "🔊 VOICE CHANNELS": [
            "🔊｜Lobby",
            "🎮｜Gaming 01",
            "🎮｜Gaming 02",
            "🎵｜Music",
            "💤｜AFK"
        ]
    };

    try {
        for (const [categoryName, channels] of Object.entries(categories)) {

            const category = await message.guild.channels.create({
                name: categoryName,
                type: ChannelType.GuildCategory
            });

            for (const channelName of channels) {

                await message.guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildText,
                    parent: category.id
                });
            }
        }

        await message.channel.send(
            "✅ Linux_jpのチャンネル作成が完了しました！"
        );

    } catch (error) {

        console.error(error);

        await message.channel.send(
            "❌ 作成に失敗しました。Botの権限を確認してください。"
        );
    }
});

client.login(process.env.DISCORD_TOKEN);
