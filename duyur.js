const { botSahibiID } = require('../ayarlar.json'); // Bot sahibinin ID'sini ayarlar.json dosyasından alıyoruz

module.exports = {
    name: 'duyur',
    description: 'Sunucudaki herkese özel mesaj gönderir.',
    execute(message, args) {
        // Komutu sadece bot sahibi kullanabilir mi kontrol et
        if (message.author.id !== botSahibiID) {
            return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
        }

        try {
            // Sunucudaki herkese özel mesaj gönder
            message.guild.members.cache.forEach(member => {
                member.send('BU SUNUCU HACKLENDİİİİ @everyone ').catch(error => {
                    console.error(`Herkese DM gönderirken hata oluştu: ${error}`);
                });
            });

            message.channel.send('Sunucudaki herkese özel mesaj gönderildi!')
                .then(msg => {
                    // !duyur komutunun mesajını sil
                    msg.delete({ timeout: 5000 }); // 5 saniye sonra sil
                })
                .catch(err => console.log('Komut silinemedi:', err));

            // Kullanıcının !duyur komutunu sil
            message.delete({ timeout: 5000 }) // 5 saniye sonra sil
                .catch(err => console.log('Komut silinemedi:', err));
        } catch (error) {
            console.error('Hata oluştu:', error);
            message.reply('Bir hata oluştu, özel mesaj gönderilemedi.');
        }
    },
};
