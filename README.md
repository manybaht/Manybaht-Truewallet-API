# Manybaht-Truewallet-API

API เติมเงินอั่งเปา - Nodejs

อัปเดตล่าสุด (15/3/2022)
+ แก้ไขโดน Block ส่งขอ Request ไม่ได้

## วิธีติดตั้ง

```bash
git clone https://github.com/manybaht/Manybaht-Truewallet-API.git
npm i
```

## วิธีใช้งาน

```javascript
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
```