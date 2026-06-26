function showToast(label) {
  const t = document.getElementById('toast');
  t.textContent = 'คัดลอก' + label + 'แล้ว 🖤';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.top = '-9999px';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  document.body.removeChild(ta);
  return ok;
}

function copyItem(btnId, real, label) {
  if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
    navigator.clipboard.writeText(real).then(() => {
      showToast(label);
    }).catch(() => {
      if (fallbackCopy(real)) showToast(label);
    });
  } else {
    if (fallbackCopy(real)) showToast(label);
  }
}

/**
 * สำหรับปุ่ม BCEL One (Laos) โดยเฉพาะ:
 * 1) คัดลอกเลขบัญชีไปยัง clipboard เหมือนปุ่มอื่น
 * 2) ดาวน์โหลดรูป (QR/บัญชี) ลงเครื่องผู้ใช้โดยอัตโนมัติ
 *
 * รูปที่ใช้ดาวน์โหลดตอนนี้เป็น "รูป placeholder" ฝังอยู่ใน href ของ
 * <a id="bcel-download-link"> ในไฟล์ index.html (เป็น base64 data URI)
 * เมื่อมีรูปจริง ให้แปลงรูปนั้นเป็น base64 แล้วแทนค่า href ของแท็กนี้ในไฟล์ index.html
 */
function copyAndDownloadBcel(real, label) {
  const doDownload = () => {
    const link = document.getElementById('bcel-download-link');
    if (link) link.click();
  };

  if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
    navigator.clipboard.writeText(real).then(() => {
      showToast(label);
      doDownload();
    }).catch(() => {
      if (fallbackCopy(real)) showToast(label);
      doDownload();
    });
  } else {
    if (fallbackCopy(real)) showToast(label);
    doDownload();
  }
}
