window.tofupassStudentTestLocale = {
  "dateLocale": "id",
  "text": {
    "passedSummary": "{passed} dari {total} berlalu",
    "progress": "{current} dari {total}",
    "notTaken": "Tidak diambil",
    "passInstruction": "Pass dengan {dibutuhkan} dari {total} benar.",
    "startQuiz": "Mulai Quiz",
    "retakeQuiz": "Ambil kembali Quiz",
    "moduleKickerOf": "{kicker} dari {total}",
    "questionTitle": "{judul}: Pertanyaan {nomor}",
    "next": "Berikutnya",
    "seeScore": "Lihat Nilai",
    "correctPrefix": "Benar.",
    "reviewPrefix": "Tinjau yang ini.",
    "passed": "Lulus",
    "retakeNeeded": "Perlu mengambil kembali",
    "passedMessage": "Kerja bagus. kuis ini selesai. Terus sampai enam berlalu.",
    "retakeMessage": "kuis ini membutuhkan 85% atau lebih tinggi. Tinjau barang yang hilang, kemudian ambil lagi.",
    "gotIt": "Mengerti",
    "review": "Ulasan",
    "yourAnswer": "Jawaban Anda: {jawaban}",
    "bestAnswer": "Jawaban terbaik: {jawaban}",
    "studentName": "Nama Mahasiswa",
    "unlocked": "Tidak dikunci",
    "passedBadge": "{lulus} / {total} berlalu",
    "overallGrade": "Kelas overall: {grade}%",
    "overallGradeBlank": "Kelas atas: -",
    "date": "Tanggal: {tanggal}",
    "dateBlank": "Tanggal: --",
    "incomplete": "Tidak lengkap"
  },
  "modules": [
    {
      "id": "password-basics",
      "title": "Basics Sandi",
      "shortTitle": "Basics",
      "kicker": "Quiz 1",
      "description": "Pilih sandi yang lebih kuat dengan memahami panjang, acak, dan pola yang jelas.",
      "questions": [
        {
          "scenario": "Kau membuat password untuk rekening sekolah baru.",
          "question": "Sandi mana yang paling aman?",
          "options": [
            "school2026",
            "MyName!",
            "RiverMisoCloud!",
            "password-but-long"
          ],
          "answer": 2,
          "explanation": "Sandi yang lebih aman panjang, unik, dan tidak berdasarkan kata pribadi atau sekolah yang jelas."
        },
        {
          "scenario": "Sebuah situs web membutuhkan nomor dan simbol.",
          "question": "Pola sandi mana yang terkuat?",
          "options": [
            "Sepakbola!",
            "Spring2026!",
            "MisoRiverOrbit!",
            "My SchoolMascot # 5"
          ],
          "answer": 2,
          "explanation": "Kata-kata yang mudah dibaca ditambah simbol dan angka lebih sulit untuk menebak daripada pola sekolah umum atau musim."
        },
        {
          "scenario": "Anda perlu sesuatu yang lebih mudah untuk mengetik dengan tangan.",
          "question": "Kebiasaan apa yang paling membantu?",
          "options": [
            "Gunakan kata pendek dan ulang tahun",
            "Gunakan kata-kata yang mudah dibaca acak dan tetap unik",
            "Gunakan nama peliharaanmu dengan 123",
            "Gunakan kembali yang sudah kau kenal."
          ],
          "answer": 1,
          "explanation": "Kata acak dapat digunakan dan kuat, terutama ketika setiap akun mendapatkan kata sandinya sendiri."
        },
        {
          "scenario": "Kata sandi punya nama, tim, atau ulang tahun.",
          "question": "Mengapa itu berisiko?",
          "options": [
            "Ini terlalu sulit untuk diingat",
            "Penyerang dapat menebak pola pribadi",
            "Selalu merusak situs web",
            "Itu hanya penting bagi guru"
          ],
          "answer": 1,
          "explanation": "Nama, tim, ulang tahun, dan kata-kata sekolah lebih mudah bagi orang-orang dan sandi alat untuk menebak."
        },
        {
          "scenario": "Seorang teman mengatakan \"P @ ssw0rd!\" kuat karena memiliki simbol.",
          "question": "Apa masalahnya?",
          "options": [
            "Hal ini terlalu panjang",
            "Ini tidak memiliki huruf kecil",
            "Ini adalah pola umum penyerang tahu",
            "Simbol membuat sandi lebih lemah"
          ],
          "answer": 2,
          "explanation": "Penggantian umum seperti @ untuk a dan 0 untuk o adalah baik-diketahui trik, bukan acak nyata."
        },
        {
          "scenario": "Anda membandingkan dua password.",
          "question": "Apa yang biasanya membantu lebih dari membuat password pendek aneh?",
          "options": [
            "Membuatnya lebih panjang",
            "Menghapus semua spasi",
            "Menggunakan inisialmu",
            "Mengubah satu huruf ke nomor"
          ],
          "answer": 0,
          "explanation": "Panjang sangat kuat. Sandi acak yang lebih panjang biasanya lebih kuat daripada sandi pendek dengan perubahan yang dapat diprediksi."
        },
        {
          "scenario": "Anda membuat sandi dan tidak menyukainya.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Sunting ke frasa favorit",
            "Hasilkan satu acak lain",
            "Tambahkan ulang tahun Anda ke akhir",
            "Gunakan yang sama dari situs lain"
          ],
          "answer": 1,
          "explanation": "Bila sandi yang dihasilkan tidak bekerja bagi Anda, hasilkan yang baru ketimbang mengubahnya menjadi pola pribadi."
        }
      ]
    },
    {
      "id": "reuse-managers",
      "title": "Penggunaan kembali dan Manajer",
      "shortTitle": "Pakai Ulang",
      "kicker": "Quiz 2",
      "description": "Pelajari mengapa setiap akun membutuhkan password sendiri dan bagaimana manajer sandi membantu.",
      "questions": [
        {
          "scenario": "Anda menggunakan sandi yang sama untuk permainan, email sekolah, dan situs belanja.",
          "question": "Mengapa itu berisiko?",
          "options": [
            "Itu membuat kata sandi terlalu panjang",
            "Satu pelanggaran dapat membuka ketiga akun",
            "Situs web dapat melihat setiap sandi yang Anda gunakan",
            "Itu hanya penting bagi orang dewasa"
          ],
          "answer": 1,
          "explanation": "Jika satu situs membocorkan sandi yang digunakan ulang, penyerang coba di situs lain secara otomatis."
        },
        {
          "scenario": "Manajer sandi tersedia untuk Anda.",
          "question": "Untuk apa?",
          "options": [
            "Mengingat sandi unik dengan aman",
            "Membuat setiap kata sandi sama",
            "Berbagi sandi kelas secara terbuka",
            "Matikan otentikasi dua faktor"
          ],
          "answer": 0,
          "explanation": "Manajer sandi membantu Anda menjaga password yang unik dan kuat tanpa mengingat semuanya."
        },
        {
          "scenario": "Anda menggunakan manajer sandi.",
          "question": "Apa yang harus password master Anda?",
          "options": [
            "Pendek dan mudah",
            "Sama seperti kata sandi sekolahmu",
            "Panjang, unik, dan pribadi",
            "Nomor makan siangmu"
          ],
          "answer": 2,
          "explanation": "Sandi utama melindungi manajer, sehingga harus panjang, unik, dan tidak pernah bersama."
        },
        {
          "scenario": "Anda tidak dapat menggunakan manajer sandi untuk satu akun sekolah.",
          "question": "Apa kebiasaan terbaik berikutnya?",
          "options": [
            "Gunakan kembali sandi yang akrab",
            "Gunakan sandi unik yang dihasilkan Anda dapat mengetik",
            "Gunakan nama pengguna Anda sebagai kata sandi",
            "Tulis dalam doc kelas publik"
          ],
          "answer": 1,
          "explanation": "Bahkan tanpa seorang manajer, sandi harus tetap unik dan dihasilkan daripada digunakan kembali."
        },
        {
          "scenario": "Seorang teman ingin menyimpan login Anda dalam browser mereka untuk Anda.",
          "question": "Apa yang harus kau katakan?",
          "options": [
            "Ya, jika mereka berjanji untuk tidak melihat",
            "Tidak, passwordku tetap di rekening atau manajerku",
            "Hanya untuk situs sekolah",
            "Hanya jika mereka menghapusnya minggu depan"
          ],
          "answer": 1,
          "explanation": "Menyimpan sandi Anda di peramban orang lain memberikan akses perangkat mereka ke akun Anda."
        },
        {
          "scenario": "Kau punya lusinan rekening.",
          "question": "Apa rencana realistis yang paling aman?",
          "options": [
            "Satu kata sandi untuk semuanya",
            "Beberapa sandi diputar",
            "Sandi unik disimpan di manajer",
            "Sandi berdasarkan nama akun"
          ],
          "answer": 2,
          "explanation": "Kata sandi unik membatasi kerusakan. Seorang manajer membuatnya realistis untuk kehidupan sehari-hari."
        },
        {
          "scenario": "Sebuah situs memberitahu Anda password Anda muncul dalam pelanggaran.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Ubah hanya password itu jika itu unik",
            "Abaikan saja jika kau masih mengingatnya",
            "Kirim kata sandi untuk meminta teman",
            "Menggunakannya kembali dengan satu simbol lagi"
          ],
          "answer": 0,
          "explanation": "Jika kata sandinya unik, mengubah akun itu mungkin cukup. Jika itu digunakan kembali, mengubah setiap account yang menggunakannya."
        }
      ]
    },
    {
      "id": "phishing",
      "title": "Filshing dan Links",
      "shortTitle": "Filshing",
      "kicker": "Quiz 3",
      "description": "Praktek melihat pesan mendesak, tanda palsu dalam halaman, dan link yang mencurigakan.",
      "questions": [
        {
          "scenario": "Anda mendapatkan pesan yang mengatakan akun Anda akan dihapus kecuali Anda masuk sekarang.",
          "question": "Apa langkah teraman selanjutnya?",
          "options": [
            "Klik link dengan cepat",
            "Balas dengan nama pengguna Anda",
            "Buka situs sekolah dari sebuah bookmark atau alamat yang diketik",
            "Teruskan untuk semua orang"
          ],
          "answer": 2,
          "explanation": "Pesan log masuk penting adalah trik phishing klasik. Pergi ke situs nyata sendiri."
        },
        {
          "scenario": "Sebuah link mengatakan sekolah-login.example.com tapi situs sekolah nyata menggunakan sekolah.pendidikan.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Masuk karena tertulis sekolah",
            "Periksa dengan guru atau buka situs nyata sendiri",
            "Coba kata sandi lama Anda terlebih dahulu",
            "Berbagi dalam obrolan kelas"
          ],
          "answer": 1,
          "explanation": "Dengar, alamat yang sama mencurigakan. Gunakan situs yang dikenal nyata atau meminta orang dewasa terpercaya."
        },
        {
          "scenario": "Sebuah email mengatakan kau memenangkan hadiah dan meminta password sekolahmu.",
          "question": "Apa tanda peringatan terbesar?",
          "options": [
            "Ini menyebutkan hadiah",
            "Ini meminta kata sandi Anda",
            "Itu tiba di pagi hari",
            "Ini memiliki gambar"
          ],
          "answer": 1,
          "explanation": "Orang-orang sah dan situs seharusnya tidak meminta Anda untuk mengirim sandi Anda dalam pesan."
        },
        {
          "scenario": "Halaman log masuk terlihat hampir normal tapi memiliki kesalahan ejaan dan alamat web yang aneh.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Masukkan hanya nama pengguna Anda",
            "Tutup dan pergi ke situs nyata dengan cara lain",
            "Coba kata sandi palsu dulu",
            "Segarkan sampai terlihat lebih baik"
          ],
          "answer": 1,
          "explanation": "Alamat aneh ditambah rincian ceroboh cukup alasan untuk berhenti dan menggunakan jalur terpercaya."
        },
        {
          "scenario": "Seorang teman sekelas mengirim file link dan mengatakan \"buka ini sekarang\".",
          "question": "Apa respon yang lebih aman?",
          "options": [
            "Tanyakan apa itu sebelum membuka",
            "Unduh segera",
            "Masukkan sandi anda jika diminta",
            "Kirim ke lebih banyak orang"
          ],
          "answer": 0,
          "explanation": "Tidak terduga link dan file layak cek cepat, bahkan ketika mereka datang dari seseorang yang Anda kenal."
        },
        {
          "scenario": "Sebuah pop- up mengatakan komputer Anda terinfeksi dan meminta Anda untuk menelepon nomor.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Hubungi nomor",
            "Berikan akses jarak jauh",
            "Tutup dan beritahu orang dewasa terpercaya atau IT",
            "Bayar untuk menghapus peringatan"
          ],
          "answer": 2,
          "explanation": "Menakuti pop- up mencoba untuk terburu-buru Anda. Hentikan, tutup jika memungkinkan, dan mendapatkan bantuan dari orang yang terpercaya."
        },
        {
          "scenario": "Anda mengklik link yang mencurigakan tetapi tidak memasukkan sandi.",
          "question": "Apa yang harus kau lakukan selanjutnya?",
          "options": [
            "Berpura-pura tidak ada yang terjadi",
            "Beritahu seorang guru atau dipercaya orang dewasa",
            "Kirim ke teman untuk menguji",
            "Masukkan kata sandi Anda untuk melihat apa yang terjadi"
          ],
          "answer": 1,
          "explanation": "Pelaporan awal membantu menghentikan scam dari penyebaran, bahkan jika Anda tidak mengetik apa-apa."
        }
      ]
    },
    {
      "id": "mfa-recovery",
      "title": "MFA dan Pemulihan",
      "shortTitle": "MFA",
      "kicker": "Quiz 4",
      "description": "Melindungi kode verifikasi, push prompt, kode cadangan, dan pilihan pemulihan.",
      "questions": [
        {
          "scenario": "Sebuah situs menawarkan dua faktor otentikasi.",
          "question": "Apa dua faktor otentikasi lakukan?",
          "options": [
            "Ini menggantikan kata sandi Anda",
            "Itu membuat Anda mengubah password setiap hari",
            "Ini menambahkan bukti lain bahwa itu benar-benar Anda",
            "Ini menyimpan kata sandi untuk teman-teman"
          ],
          "answer": 2,
          "explanation": "Authentikasi faktor ganda menambahkan lapis lain, seperti kode atau prompt, setelah kata sandi."
        },
        {
          "scenario": "Layar log masuk meminta kode dari aplikasi otentikasi Anda.",
          "question": "Siapa yang harus mendapatkan kode itu?",
          "options": [
            "Hanya kau",
            "Siapa pun dari dukungan teknologi yang meminta",
            "Seorang teman membantu mengerjakan PR",
            "Sebuah kotak obrolan situs"
          ],
          "answer": 0,
          "explanation": "Kode faktor dua adalah rahasia. Staf dukungan sebenarnya tidak perlu Anda untuk membacanya kepada mereka."
        },
        {
          "scenario": "Telepon Anda meminta Anda untuk menyetujui login Anda tidak mulai.",
          "question": "Apa yang harus Anda tekan?",
          "options": [
            "Approve",
            "Menolak atau menolak",
            "Buktikan jika kau sibuk.",
            "Menunjukan, kemudian mengubahnya nanti"
          ],
          "answer": 1,
          "explanation": "Promosi MFA tak terduga bisa berarti seseorang memiliki kata sandi Anda. Deny permintaan dan mendapatkan bantuan."
        },
        {
          "scenario": "Pesan obrolan game menanyakan kode login enam digit untuk \"verifikasi akun Anda\".",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Kirim jika mereka tampak resmi",
            "Jangan pernah berbagi kode",
            "Kirim setelah mengubah sandi Anda",
            "Mintalah mereka untuk berjanji aman"
          ],
          "answer": 1,
          "explanation": "Kode login bersifat pribadi. Berbagi satu dapat membiarkan seseorang ke rekening Anda."
        },
        {
          "scenario": "Anda menerima kode pemulihan cadangan.",
          "question": "Kemana mereka harus pergi?",
          "options": [
            "Di tempat pribadi yang aman",
            "Dalam folder kelas publik",
            "Dalam profil sosial Anda",
            "Pada catatan lengket pada komputer bersama"
          ],
          "answer": 0,
          "explanation": "Kode pemulihan dapat membuka rekening, sehingga mereka perlu penyimpanan pribadi."
        },
        {
          "scenario": "Anda kehilangan akses ke ponsel Anda digunakan untuk MFA.",
          "question": "Apa langkah terbaik selanjutnya?",
          "options": [
            "Buat akun baru segera",
            "Mintalah guru, wali, atau dukungan resmi untuk bantuan pemulihan",
            "Tebak kode cadangan online",
            "Gunakan nomor telepon teman diam-diam"
          ],
          "answer": 1,
          "explanation": "Pemulihan akun harus melalui orang dewasa terpercaya atau saluran dukungan resmi."
        },
        {
          "scenario": "Seseorang mengatakan mereka IT dan meminta kode MFA Anda.",
          "question": "Apa yang harus kau ingat?",
          "options": [
            "Dukungan Real mungkin perlu kode",
            "MFA kode membuktikan identitas dan harus tinggal pribadi",
            "Kode aman setelah 30 detik",
            "Tidak apa-apa jika mereka tahu namamu"
          ],
          "answer": 1,
          "explanation": "Kode MFA sangat kuat karena mereka membuktikan identitas. Jangan bagikan dengan penelepon atau pesan obrolan."
        }
      ]
    },
    {
      "id": "shared-devices",
      "title": "Perangkat Bersama",
      "shortTitle": "Perangkat",
      "kicker": "Quiz 5",
      "description": "Tetap aman di komputer kelas, perangkat pinjaman, Wi- Fi publik, dan browser bersama.",
      "questions": [
        {
          "scenario": "Anda berada di komputer kelas bersama.",
          "question": "Apa yang harus kau lakukan sebelum pergi?",
          "options": [
            "Tutup tutup atau monitor",
            "Log keluar dari akun Anda",
            "Biarkan tab terbuka untuk kelas berikutnya",
            "Simpan sandi Anda di peramban"
          ],
          "answer": 1,
          "explanation": "Logging keluar menjaga orang berikutnya dari membuka akun Anda dari sesi peramban yang sama."
        },
        {
          "scenario": "Peramban pada komputer bersama meminta untuk menyimpan sandi Anda.",
          "question": "Apa yang harus kau pilih?",
          "options": [
            "Simpan",
            "Pernah atau tidak sekarang",
            "Simpan hanya untuk sekolah",
            "Simpan jika kelas hampir berakhir"
          ],
          "answer": 1,
          "explanation": "Peramban bersama seharusnya tidak menyimpan sandi pribadi Anda."
        },
        {
          "scenario": "Kau meminjam laptop teman untuk memeriksa email.",
          "question": "Apa yang harus kau hindari?",
          "options": [
            "Logging keluar sesudahnya",
            "Menggunakan jendela privat bila tersedia",
            "Menyimpan sandi Anda dalam peramban mereka",
            "Membuka situs nyata sendiri"
          ],
          "answer": 2,
          "explanation": "Menyimpan sandi pada perangkat orang lain dapat meninggalkan akun Anda diakses setelah Anda mengembalikannya."
        },
        {
          "scenario": "Anda menemukan orang lain masih masuk pada komputer kelas.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Baca pesan mereka",
            "Pos sesuatu yang lucu",
            "Log mereka keluar dan memberitahu seorang guru",
            "Ubah kata sandi mereka"
          ],
          "answer": 2,
          "explanation": "Menghormati privasi mereka, log out jika sesuai, dan membiarkan orang dewasa terpercaya tahu."
        },
        {
          "scenario": "Halaman log masuk Wi- Fi publik menanyakan kata sandi sekolah Anda.",
          "question": "Apa yang paling aman?",
          "options": [
            "Masukkan karena Wi- Fi membutuhkannya",
            "Periksa dengan orang dewasa terpercaya atau gunakan instruksi jaringan sekolah resmi",
            "Coba kata sandi Anda dua kali",
            "Gunakan sandi teman"
          ],
          "answer": 1,
          "explanation": "Jangan masukkan kredensial sekolah ke halaman Wi- Fi acak tanpa konfirmasi mereka resmi."
        },
        {
          "scenario": "Anda mengunduh ekstensi peramban menjanjikan mata uang game gratis.",
          "question": "Apa kekhawatiran?",
          "options": [
            "Ekstensi kadang-kadang dapat membaca atau mengubah data peramban",
            "Ekstensi selalu sekolah-disetujui",
            "Ekstensi permainan meningkatkan keamanan",
            "Itu hanya penting di telepon"
          ],
          "answer": 0,
          "explanation": "Ekstensi dapat memiliki akses yang kuat. Hanya memasang perangkat terpercaya yang disetujui."
        },
        {
          "scenario": "Anda selesai menggunakan aplikasi web pada perangkat bersama.",
          "question": "Tindakan apa yang paling lengkap?",
          "options": [
            "Tutup tab saja",
            "Keluar, lalu tutup tab",
            "Kecilkan kecerahan",
            "Biarkan peramban terbuka"
          ],
          "answer": 1,
          "explanation": "Menutup tab mungkin tidak mengakhiri sesi. Logging adalah kebiasaan yang lebih aman."
        }
      ]
    },
    {
      "id": "incident-response",
      "title": "When Things Go Wrong",
      "shortTitle": "Respon",
      "kicker": "Quiz 6",
      "description": "Tahu kapan harus mengubah sandi, laporkan aktivitas mencurigakan, dan minta bantuan.",
      "questions": [
        {
          "scenario": "Anda berpikir orang lain mungkin tahu password Anda.",
          "question": "Apa yang harus kau lakukan dulu?",
          "options": [
            "Abaikan saja kecuali sesuatu yang buruk terjadi",
            "Menggantikannya dan memberitahu orang dewasa dipercaya atau guru",
            "Kirim peringatan daring",
            "Gunakan sandi yang sama dengan satu nomor tambahan"
          ],
          "answer": 1,
          "explanation": "Ubah kata sandinya, lalu cari bantuan. Jika rekening ini penting, seseorang mungkin perlu memeriksa aktivitas."
        },
        {
          "scenario": "Anda melihat pesan yang dikirim dari akun Anda yang tidak Anda tulis.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Hapus mereka dengan tenang",
            "Ubah kata sandi Anda dan laporkan",
            "Kirim lebih banyak pesan untuk menjelaskan",
            "Berikan rekening ke teman"
          ],
          "answer": 1,
          "explanation": "Aktivitas tak terduga bisa berarti rekening terganggu. Ubah kata sandinya dan cepat laporkan."
        },
        {
          "scenario": "Anda sengaja berbagi sandi Anda dalam percakapan.",
          "question": "Apa respon yang paling aman?",
          "options": [
            "Ubah segera",
            "Harapan tidak ada yang melihat",
            "Meminta orang untuk tidak menggunakannya",
            "Hapus pesan minggu depan"
          ],
          "answer": 0,
          "explanation": "Setelah sandi dibagi, memperlakukannya sebagai tidak lagi pribadi dan mengubahnya."
        },
        {
          "scenario": "Sebuah situs mengatakan password Anda lemah.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Tambah 1 ke akhir",
            "Buat sandi unik baru yang kuat",
            "Abaikan saja jika Anda suka kata sandi",
            "Gunakan nama sekolah Anda dengan simbol"
          ],
          "answer": 1,
          "explanation": "Peringatan adalah waktu yang tepat untuk mengganti kata sandi dengan sesuatu yang lebih kuat dan unik."
        },
        {
          "scenario": "Anda menerima email tentang login dari tempat yang tidak Anda kenal.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Gunakan link surel untuk log masuk",
            "Buka situs nyata sendiri, periksa aktivitas, dan ubah kata sandi jika perlu",
            "Teruskan email ke teman",
            "Balas dengan kata sandi Anda"
          ],
          "answer": 1,
          "explanation": "Gunakan jalur terpercaya untuk memeriksa akun. Jangan gunakan link dari pesan yang mencurigakan."
        },
        {
          "scenario": "Seorang teman bilang mereka diretas dan meminta kata sandimu untuk menguji sesuatu.",
          "question": "Apa yang harus kau lakukan?",
          "options": [
            "Bagi untuk membantu",
            "Jangan berbagi dan mendorong mereka untuk mendapatkan bantuan terpercaya",
            "Gunakan sandi lama",
            "Berbagi hanya secara pribadi"
          ],
          "answer": 1,
          "explanation": "Membantu teman tidak perlu berbagi kata sandi Anda. Keberanian pemulihan melalui dukungan terpercaya."
        },
        {
          "scenario": "Anda tidak yakin apakah sesuatu yang aman.",
          "question": "Apa itu aturan yang baik?",
          "options": [
            "Tanyakan sebelum memasuki informasi privat",
            "Klik lebih cepat sebelum kadaluarsa",
            "Coba kata sandi dan lihat",
            "Berbagi dengan teman sekelas pertama"
          ],
          "answer": 0,
          "explanation": "Berhenti dan tanyakan pada orang dewasa yang dipercaya atau guru adalah kebiasaan keamanan yang kuat."
        }
      ]
    }
  ]
};
