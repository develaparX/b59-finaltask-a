function hitungVoucher(voucher, uangBelanja) {
  let potongan = 0;
  let minimalBelanja = 0;
  let maksimalDiskon = 0;

  if (voucher === "DumbWaysJos") {
    potongan = 0.211;
    minimalBelanja = 50000;
    maksimalDiskon = 20000;
  } else if (voucher === "DumbWaysMantap") {
    potongan = 0.3;
    minimalBelanja = 80000;
    maksimalDiskon = 40000;
  } else {
    console.log("Voucher tidak valid");
    return;
  }

  if (uangBelanja < minimalBelanja) {
    console.log(
      "Uang belanja tidak memenuhi syarat minimal untuk menggunakan voucher"
    );
    return;
  }

  let diskon = uangBelanja * potongan;
  if (diskon > maksimalDiskon) {
    diskon = maksimalDiskon;
  }

  let totalBayar = uangBelanja - diskon;

  let kembalian = uangBelanja - totalBayar;

  console.log(`Uang yang harus dibayar: ${totalBayar}`);
  console.log(`Diskon: ${diskon}`);
  console.log(`Kembalian: ${kembalian}`);
}

// Contoh penggunaan
hitungVoucher("DumbWaysJos", 60000);
