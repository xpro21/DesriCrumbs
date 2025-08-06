// Preview foto produk sesuai varian yang dipilih
const varianSelect = document.getElementById('varian');
const fotoVarian = document.getElementById('fotoVarian');
const pesananForm = document.getElementById('pesananForm');
const pesanSukses = document.getElementById('pesanSukses');

const varianFoto = {
    'original': 'assets/1.jpg',
    'original-daun-jeruk': 'assets/2.jpg',
    'pedas-cikur': 'assets/3.jpg',
    'pedas-daun-jeruk': 'assets/4.jpg',
    'pedas-manis': 'assets/1.jpg'
};

varianSelect.addEventListener('change', function() {
    const selected = varianSelect.value;
    fotoVarian.src = varianFoto[selected] || 'assets/1.jpg';
    fotoVarian.alt = 'Preview ' + varianSelect.options[varianSelect.selectedIndex].text;
});

pesananForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Ambil data utama
    const nama = pesananForm.querySelector('#nama').value.trim();
    const alamat = pesananForm.querySelector('#alamat').value.trim();
    // Ambil varian utama
    const snackUtama = pesananForm.querySelector('#snack').value;
    const varianUtama = pesananForm.querySelector('#varian').options[pesananForm.querySelector('#varian').selectedIndex].text;
    const ukuranUtama = pesananForm.querySelector('#ukuran').options[pesananForm.querySelector('#ukuran').selectedIndex].text;
    const jumlahUtama = pesananForm.querySelector('#jumlah').value;

    // Ambil varian tambahan
    const rows = pesananForm.querySelectorAll('#varianContainer .form-row');
    let pesananList = [];
    // Baris pertama (utama)
    pesananList.push(`- ${snackUtama.charAt(0).toUpperCase() + snackUtama.slice(1)} | ${varianUtama} | ${ukuranUtama} | Jumlah: ${jumlahUtama}`);
    // Baris tambahan (jika ada)
    if (rows.length > 1) {
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const snack = row.querySelector('select[name="snack[]"]').value;
        const varian = row.querySelector('select[name="varian[]"]').options[row.querySelector('select[name="varian[]"]').selectedIndex].text;
        const ukuran = row.querySelector('select[name="ukuran[]"]').options[row.querySelector('select[name="ukuran[]"]').selectedIndex].text;
        const jumlah = row.querySelector('input[name="jumlah[]"]').value;
        pesananList.push(`- ${snack.charAt(0).toUpperCase() + snack.slice(1)} | ${varian} | ${ukuran} | Jumlah: ${jumlah}`);
      }
    }

    // Rangkai pesan WhatsApp
    let pesan = `Assalamualaikum kak, saya mau pesan snack:\n\nNama: ${nama}\nAlamat: ${alamat}\n\nPesanan:\n${pesananList.join("\n")}\n\nTerima kasih!`;
    let url = `https://wa.me/6282117862420?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
    // Tidak tampilkan pesan sukses, biarkan user tetap di form
});
