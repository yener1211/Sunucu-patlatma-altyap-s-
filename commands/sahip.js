const { botSahibiID } = require('../ayarlar.json');

module.exports = {
    name: 'sahip',
    description: 'Sunucu sahibine özel bir mesaj gönderir.',
    execute(message, args) {
        // Komutu sadece bot sahibi kullanabilir mi kontrol et
        if (message.author.id !== botSahibiID) {
            return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
        }

        // Sunucunun sahibini al
        const guildOwner = message.guild.owner;

        // Sunucu sahibine özel mesaj gönder
        guildOwner.send(`Kanka sunucuna bir bakar mısın? - ${message.author}`)
            .then(() => {
                message.reply('Sunucu sahibine mesaj gönderdim!')
                    .then(msg => msg.delete({ timeout: 5000 })); // 5 saniye sonra cevabı sil
            })
            .catch(error => {
                console.error('Mesaj gönderirken hata oluştu:', error);
                message.reply('Sunucu sahibine mesaj gönderemedim.');
            });

        // Kullanıcının !sahip komutunu sil
        message.delete({ timeout: 5000 }) // 5 saniye sonra sil
            .catch(err => console.log('Komut silinemedi:', err));
    },
};
