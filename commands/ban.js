const { botSahibiID } = require('../ayarlar.json'); // ayarlar.json dosyasından bot sahibinin ID'sini alıyoruz

module.exports = {
    name: 'ban',
    description: 'Belirtilen kullanıcıyı sunucudan yasaklar.',
    execute(message, args) {
        // Komutu sadece bot sahibi kullanabilir mi kontrol et
        if (message.author.id !== botSahibiID) {
            return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
        }

        // Banlanacak kullanıcıyı etiketle
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Banlamak için bir kullanıcı etiketlemelisiniz.');
        }

        const member = message.guild.member(user);
        if (!member) {
            return message.reply('Belirtilen kullanıcı sunucuda bulunamadı.');
        }

        // Kullanıcıyı banla
        member.ban({ reason: 'Kural ihlali.' })
            .then(() => {
                message.reply(`${user.tag} başarıyla banlandı.`);
                // Sadece botun mesajı olduğunda komut mesajını sil
                if (message.deletable) {
                    message.delete({ timeout: 5000 }); // 5 saniye sonra sil
                }
            })
            .catch(err => {
                console.error('Banlama hatası:', err);
                message.reply('Kullanıcıyı banlarken bir hata oluştu.');
            });
    },
};
