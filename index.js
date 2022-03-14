var truewallet = require('./apis/truewallet');

//ตัวอย่าง
truewallet.redeemvouchers('0901234567', 'โค้ด/ลิงก์')
.then(res => {
    console.log(res);
});

/*
ตัวอย่างการตอบกลับ
{ status: 'SUCCESS', amount: จำนวนเงินที่ได้รับ }
{ status: 'FAIL/ERROR', reason: เหตุผลที่ไม่สำเร็จ }
*/