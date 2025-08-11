const WHATSAPP_NUMBER = '989171912114';
let selectedInsurance = '';

function showForm(type) {
    selectedInsurance = type;
    document.getElementById('form-title').innerText = type;
    const dynamicFields = document.getElementById('dynamic-fields');
    dynamicFields.innerHTML = '';

    if (type === 'بیمه شخص ثالث' || type === 'بیمه بدنه') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <select id="vehicleType">
                    <option value="">نوع خودرو (انتخاب شود)</option>
                    <option>سواری</option>
                    <option>وانت</option>
                    <option>کامیونت</option>
                    <option>کامیون</option>
                    <option>غیر متعارف</option>
                </select>
            </div>
            <div class="form-group">
                <select id="carSelect">
                    <option value="">انتخاب خودرو</option>
                    <option>پژو 206</option>
                    <option>پژو پارس</option>
                    <option>پژو 405</option>
                    <option>سمند</option>
                    <option>تیبا</option>
                    <option>پراید 131</option>
                    <option>دنا پلاس</option>
                    <option>هیوندای النترا</option>
                    <option>کیا سراتو</option>
                    <option>تویوتا کرولا</option>
                    <option>BMW 320i</option>
                    <option>Mercedes C200</option>
                    <option value="other">خودروی من در لیست نبود</option>
                </select>
                <input type="text" id="customCar" placeholder="نام خودرو" style="display:none; margin-top:10px;">
            </div>
            <div class="form-group">
                <select id="colorSelect">
                    <option value="">رنگ خودرو</option>
                    <option>سفید</option>
                    <option>مشکی</option>
                    <option>نقره‌ای</option>
                    <option>خاکستری</option>
                    <option>قرمز</option>
                    <option>آبی</option>
                    <option>سبز</option>
                    <option>زرد</option>
                    <option>طلایی</option>
                    <option>بنفش</option>
                    <option>صورتی</option>
                    <option>نارنجی</option>
                    <option>قهوه‌ای</option>
                    <option>کرم</option>
                    <option value="other_color">رنگ من در لیست نیست</option>
                </select>
                <input type="text" id="customColor" placeholder="رنگ خودرو" style="display:none; margin-top:10px;">
            </div>
        `;
        setTimeout(() => {
            document.getElementById('carSelect').addEventListener('change', e => {
                document.getElementById('customCar').style.display = e.target.value === 'other' ? 'block' : 'none';
            });
            document.getElementById('colorSelect').addEventListener('change', e => {
                document.getElementById('customColor').style.display = e.target.value === 'other_color' ? 'block' : 'none';
            });
        }, 0);

    } else if (type === 'بیمه مسئولیت') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <input type="text" id="job" placeholder="شغل">
            </div>
            <div class="form-group">
                <input type="text" id="workPlace" placeholder="محل فعالیت">
            </div>
        `;
    } else if (type === 'بیمه تکمیل درمان') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <input type="text" id="insuranceCompany" placeholder="نام بیمه‌گر قبلی">
            </div>
            <div class="form-group">
                <input type="number" id="familyCount" placeholder="تعداد اعضای تحت پوشش">
            </div>
            <div class="form-group">
                <input type="text" id="history" placeholder="سابقه بیمه">
            </div>
        `;
    }

    document.getElementById('insurance-form').style.display = 'block';
    setTimeout(() => document.getElementById('insurance-form').scrollIntoView({behavior:'smooth'}), 150);
}

function sendToWhatsApp(){
    if (!selectedInsurance) { alert('لطفاً نوع بیمه را انتخاب کنید.'); return; }

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const description = document.getElementById('description').value.trim();
    if (!name || !phone) { alert('نام و شماره لازم است.'); return; }

    let extraLines = '';

    if (selectedInsurance === 'بیمه شخص ثالث' || selectedInsurance === 'بیمه بدنه') {
        const vehicleType = document.getElementById('vehicleType').value;
        const car = document.getElementById('carSelect').value === 'other' ? document.getElementById('customCar').value : document.getElementById('carSelect').value;
        const color = document.getElementById('colorSelect').value === 'other_color' ? document.getElementById('customColor').value : document.getElementById('colorSelect').value;
        extraLines += (vehicleType ? 'نوع خودرو: ' + vehicleType + '\n' : '');
        extraLines += (car ? 'خودرو: ' + car + '\n' : '');
        extraLines += (color ? 'رنگ: ' + color + '\n' : '');
    } else if (selectedInsurance === 'بیمه مسئولیت') {
        const job = document.getElementById('job').value;
        const workPlace = document.getElementById('workPlace').value;
        extraLines += (job ? 'شغل: ' + job + '\n' : '');
        extraLines += (workPlace ? 'محل فعالیت: ' + workPlace + '\n' : '');
    } else if (selectedInsurance === 'بیمه تکمیل درمان') {
        const prev = document.getElementById('insuranceCompany').value;
        const fam = document.getElementById('familyCount').value;
        const hist = document.getElementById('history').value;
        extraLines += (prev ? 'بیمه‌گر قبلی: ' + prev + '\n' : '');
        extraLines += (fam ? 'تعداد اعضای خانواده: ' + fam + '\n' : '');
        extraLines += (hist ? 'سابقه بیمه: ' + hist + '\n' : '');
    }

    const lines = [
        'درخواست مشاوره بیمه',
        'نوع بیمه: ' + selectedInsurance,
        extraLines.trim(),
        'نام متقاضی: ' + name,
        'شماره تماس: ' + phone,
        '',
        'توضیحات:',
        description || '-'
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(lines);
    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encoded;
    window.open(url, '_blank').focus();
}
