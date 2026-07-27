// Computer Science Knowledge Base Data in Thai

export const CATEGORIES = [
  { id: 'all', name: 'ความรู้ทั้งหมด', icon: 'Sparkles', color: '#8B5CF6' },
  { id: 'hardware', name: 'สถาปัตยกรรม & ฮาร์ดแวร์', icon: 'Cpu', color: '#06B6D4' },
  { id: 'networking', name: 'เครือข่าย & โปรโตคอล', icon: 'Globe', color: '#10B981' },
  { id: 'algorithms', name: 'โครงสร้างข้อมูล & อัลกอริทึม', icon: 'Code2', color: '#F59E0B' },
  { id: 'security', name: 'ความปลอดภัย & การเข้ารหัส', icon: 'ShieldCheck', color: '#EC4899' },
  { id: 'web', name: 'เทคโนโลยีเว็บ & ระบบกระจาย', icon: 'Server', color: '#38BDF8' }
];

export const TOPICS = [
  {
    id: 'cpu-architecture',
    category: 'hardware',
    title: 'เจาะลึกสถาปัตยกรรม CPU และวงรอบ Instruction Cycle',
    subtitle: 'ทำความเข้าใจกระบวนการ Fetch-Decode-Execute ที่ขับเคลื่อนคอมพิวเตอร์ทุกเครื่อง',
    readTime: '6 นาที',
    difficulty: 'ระดับกลาง',
    levelColor: '#F59E0B',
    tags: ['CPU', 'Registers', 'Fetch-Decode-Execute', 'ALU'],
    summary: 'หน่วยประมวลผลกลาง (CPU) คือหัวใจของระบบคอมพิวเตอร์ ทำหน้าที่ประมวลผลคำสั่งผ่านวงรอบ Fetch, Decode, Execute และ Writeback ร่วมกับรีจิสเตอร์ชนิดต่างๆ',
    content: `
### สถาปัตยกรรมหลักของหน่วยประมวลผล (CPU)

คอมพิวเตอร์ยุคปัจจุบันใช้สถาปัตยกรรมแบบ **Von Neumann Architecture** ซึ่งแบ่งองค์ประกอบหลักออกเป็น 3 ส่วน:

1. **Control Unit (CU):** หน่วยควบคุมหน้าที่อ่านคำสั่งและควบคุมการทำงานขององค์ประกอบทั้งหมด
2. **Arithmetic Logic Unit (ALU):** หน่วยคำนวณทางคณิตศาสตร์ (บวก ลบ) และตรรกศาสตร์ (AND, OR, NOT)
3. **Registers:** หน่วยความจำความเร็วสูงมากภายใน CPU สำหรับเก็บข้อมูลชั่วคราวระหว่างประมวลผล

---

### วงรอบคำสั่ง (Instruction Cycle)

ทุกคำสั่งที่เขียนด้วยโปรแกรมจะถูกย่อยเป็นภาษาเครื่อง (Machine Code) และประมวลผลผ่าน 4 ขั้นตอนสืบเนื่องกัน:

1. **Fetch (ดึงคำสั่ง):** อ่านคำสั่งจาก RAM ตามตำแหน่งที่ระบุใน \`Program Counter (PC)\` นำมาเก็บใน \`Instruction Register (CIR)\`
2. **Decode (ถอดรหัส):** หน่วยควบคุมถอดรหัสว่าคำสั่งนั้นต้องการทำอะไร (Opcode) และใช้ข้อมูลจากไหน (Operands)
3. **Execute (ประมวลผล):** ส่งสัญญาณให้ ALU คำนวณ หรือสั่งย้ายข้อมูลในหน่วยความจำ
4. **Writeback (เขียนผลลัพธ์):** บันทึกผลลัพธ์ลงใน Register หรือ RAM เพื่อนำไปใช้งานต่อ
    `,
    interactiveType: 'cpu-sim'
  },
  {
    id: 'sorting-algorithms',
    category: 'algorithms',
    title: 'การเปรียบเทียบประสิทธิภาพของ Sorting Algorithms',
    subtitle: 'ทำความเข้าใจ Bubble Sort, Selection Sort, Quick Sort และ Big-O Notation',
    readTime: '8 นาที',
    difficulty: 'ระดับพื้นฐาน - กลาง',
    levelColor: '#10B981',
    tags: ['Algorithms', 'Sorting', 'Big-O', 'Data Structures'],
    summary: 'อัลกอริทึมการเรียงลำดับข้อมูลเป็นรากฐานสำคัญของวิทยาการคอมพิวเตอร์ การเลือกใช้อัลกอริทึมที่ถูกต้องสามารถลดเวลาระดับ O(n²) เหลือ O(n log n) ได้',
    content: `
### ทำไมต้องเรียนรู้ Sorting Algorithms?

การจัดการข้อมูลที่เรียงลำดับแล้วช่วยให้การค้นหาข้อมูล (Binary Search) ทำได้เร็วขึ้นจาก O(n) เป็น O(log n) ซึ่งมีความสำคัญมากเมื่อจัดการข้อมูลระดับล้านรายการ

---

### เปรียบเทียบความซับซ้อน (Big-O Complexity)

* **Bubble Sort:** $O(n^2)$ - เปรียบเทียบสมาชิกคู่อยู่ติดกันและสลับตำแหน่ง เหมาะสำหรับสอนคอนเซปต์เบื้องต้น
* **Selection Sort:** $O(n^2)$ - ค้นหาค่าน้อยที่สุดในส่วนที่เหลือแล้วนำมาไว้ด้านหน้า
* **Insertion Sort:** $O(n^2)$ - แทรกสมาชิกแต่ละตัวลงในตำแหน่งที่ถูกต้องทีละตัว
* **Quick Sort:** $O(n \log n)$ - ใช้กลยุทธ์ Divide and Conquer เลือก Pivot แล้วแบ่งขอบเขตข้อมูล
    `,
    interactiveType: 'algo-vis'
  },
  {
    id: 'osi-model-tcpip',
    category: 'networking',
    title: 'ถอดรหัสแบบจำลองเครือข่าย OSI 7 Layers & TCP/IP',
    subtitle: 'การเดินทางของแพ็กเก็ตข้อมูลจากเบราว์เซอร์ถึงเซิร์ฟเวอร์ปลายทาง',
    readTime: '7 นาที',
    difficulty: 'ระดับพื้นฐาน',
    levelColor: '#10B981',
    tags: ['Networking', 'OSI Model', 'TCP/IP', 'Packets', 'HTTP'],
    summary: 'เรียนรู้โครงสร้างการรับส่งข้อมูลผ่านเครือข่ายอินเทอร์เน็ต ผ่านโมเดลมาตรฐาน OSI 7 เลเยอร์ และกระบวนการ Encapsulation / Decapsulation',
    content: `
### OSI Model 7 ชั้นมีอะไรบ้าง?

1. **Layer 7 - Application:** ส่วนติดต่อกับผู้ใช้ เช่น HTTP, HTTPS, FTP, DNS
2. **Layer 6 - Presentation:** การเข้ารหัสข้อมูล รูปแบบข้อมูล (JSON, SSL/TLS, JPEG)
3. **Layer 5 - Session:** การสร้างและดูแล Session การเชื่อมต่อ
4. **Layer 4 - Transport:** ควบคุมการส่งข้อมูล เช่น TCP (การันตีข้อมูล), UDP (เน้นความเร็ว)
5. **Layer 3 - Network:** จัดเส้นทางแพ็กเก็ต (IP Address, Router)
6. **Layer 2 - Data Link:** การส่งข้อมูลระดับกายภาพ (MAC Address, Switch, Ethernet)
7. **Layer 1 - Physical:** สัญญาณไฟฟ้า แสง หรือคลื่นวิทยุ (สาย Fiber, Wi-Fi)

---

### กระบวนการ Encapsulation
เมื่อเราส่งข้อมูล ข้อมูลจะถูกห่อหุ้มด้วย Header ของแต่ละ Layer ตั้งแต่ 7 ลงมา 1 และเมื่อถึงปลายทาง จะถูกแกะ Header ออก (Decapsulation) จาก 1 ขึ้นไป 7
    `,
    interactiveType: 'none'
  },
  {
    id: 'cryptography-hashing',
    category: 'security',
    title: 'ความลับของ Cryptography & Hashing (SHA-256 vs Encryption)',
    subtitle: 'ความแตกต่างระหว่างการเข้ารหัสลับที่ย้อนกลับได้ และการแฮชแบบ One-Way',
    readTime: '6 นาที',
    difficulty: 'ระดับกลาง - สูง',
    levelColor: '#06B6D4',
    tags: ['Security', 'Cryptography', 'SHA-256', 'Caesar Cipher', 'Hashing'],
    summary: 'ทำความเข้าใจความแตกต่างระหว่าง Encryption (Symmetric/Asymmetric) กับ Hashing และการประยุกต์ใช้ในการจัดเก็บรหัสผ่านอย่างปลอดภัย',
    content: `
### 1. Hashing (การแฮชข้อมูล - สื่อสารทางเดียว)

Hashing คือกระบวนการแปลงข้อมูลขนาดใดก็ได้ให้กลายเป็นค่าข้อความที่มีความยาวคงที่ (Fixed-Length Hash) โดยมีคุณสมบัติสำคัญ:
* **One-Way:** ไม่สามารถนำค่า Hash ย้อนกลับเป็นข้อความเดิมได้
* **Deterministic:** ข้อความเดิมจะ ได้ค่า Hash เดิมเสมอ
* **Avalanche Effect:** เปลี่ยนข้อความเพียง 1 ตัวอักษร ค่า Hash จะเปลี่ยนไปโดยสิ้นเชิง

---

### 2. Encryption (การเข้ารหัสลับ - สามารถถอดรหัสได้)

* **Symmetric Encryption (กุญแจสมมาตร):** ใช้กุญแจดอกเดียวกันในการเข้ารหัสและถอดรหัส (เช่น AES-256)
* **Asymmetric Encryption (กุญแจคู่สมมาตร):** ใช้ Public Key สำหรับเข้ารหัส และ Private Key สำหรับถอดรหัส (เช่น RSA, ECC)
    `,
    interactiveType: 'crypto-sandbox'
  },
  {
    id: 'web-protocols-http',
    category: 'web',
    title: 'วิวัฒนาการของ Web Protocols: HTTP/1.1 vs HTTP/2 vs WebSockets',
    subtitle: 'จากคำขอแบบ Request-Response สู่การสื่อสารแบบ Real-time ดับเบิ้ลดูเพล็กซ์',
    readTime: '5 นาที',
    difficulty: 'ระดับพื้นฐาน',
    levelColor: '#10B981',
    tags: ['Web', 'HTTP', 'WebSockets', 'REST API', 'Protocols'],
    summary: 'เรียนรู้ว่าเบราว์เซอร์รับส่งข้อมูลกับเซิร์ฟเวอร์อย่างไร ความแตกต่างระหว่างการ Polling, HTTP Keep-Alive และการสร้างช่องทางเชื่อมต่อ WebSockets',
    content: `
### HTTP/1.1 vs HTTP/2

* **HTTP/1.1:** ส่งข้อมูลแบบ Text-based และเผชิญปัญหา Head-of-Line (HOL) Blocking ต้องสร้างการเชื่อมต่อ TCP ใหม่บ่อยครั้ง
* **HTTP/2:** ส่งข้อมูลเป็น Binary Frame รองรับ **Multiplexing** ส่งหลาย Request/Response บน TCP Connection เดียวกันได้พร้อมกัน

---

### ทำไมถึงต้องใช้ WebSockets?

ในระบบที่ต้องการความสดใหม่ของข้อมูลทันที (เช่น แอปแชท, กระดานหุ้นเรียลไทม์) HTTP Request-Response ปกติจะมี Overhead สูง **WebSockets** ช่วยให้เปิดช่องทาง Full-Duplex Bi-directional Communication ค้างไว้ ทำให้ทั้ง Client และ Server ส่งข้อมูลหากันได้ตลอดเวลาโดยไม่มี Overhead ของ HTTP Header
    `,
    interactiveType: 'none'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'ขั้นตอนแรกสุดของวงรอบคำสั่ง CPU (Instruction Cycle) คืออะไร?',
    options: ['Decode (ถอดรหัส)', 'Fetch (ดึงคำสั่งจาก RAM)', 'Execute (ประมวลผล)', 'Writeback (เขียนผลลัพธ์)'],
    correct: 1,
    explanation: 'Fetch คือขั้นตอนแรกสุดที่ CPU ดึงคำสั่งจาก RAM ตามตำแหน่งใน Program Counter (PC)'
  },
  {
    id: 2,
    question: 'Sorting Algorithm ใดมี Time Complexity เฉลี่ยอยู่ที่ O(n log n)?',
    options: ['Bubble Sort', 'Selection Sort', 'Quick Sort', 'Insertion Sort'],
    correct: 2,
    explanation: 'Quick Sort ใช้กลยุทธ์ Divide and Conquer ทำให้มีความเร็วเฉลี่ย O(n log n)'
  },
  {
    id: 3,
    question: 'Layer ใดใน OSI Model ทำหน้าที่ระบุตำแหน่ง IP Address และหาเส้นทางส่งแพ็กเก็ต?',
    options: ['Layer 2 - Data Link', 'Layer 3 - Network Layer', 'Layer 4 - Transport Layer', 'Layer 7 - Application Layer'],
    correct: 1,
    explanation: 'Layer 3 (Network Layer) ทำหน้าที่จัดการเรื่อง IP Addressing และ Routing'
  },
  {
    id: 4,
    question: 'คุณสมบัติใดที่เป็นข้อแตกต่างหลักระหว่าง Hashing และ Encryption?',
    options: [
      'Hashing ทำได้เฉพาะไฟล์ตัวเลข',
      'Encryption ไม่สามารถถอดรหัสกลับได้',
      'Hashing เป็นการแปลงข้อมูลแบบทางเดียว (One-way) ไม่สามารถถอดกลับเป็นต้นฉบับได้',
      'Hashing ต้องใช้ Private Key เสมอ'
    ],
    correct: 2,
    explanation: 'Hashing เป็นกระบวนการ One-way ไม่สามารถถอดรหัสย้อนกลับได้ ต่างจาก Encryption ที่ถอดรหัสด้วย Key ได้'
  }
];
