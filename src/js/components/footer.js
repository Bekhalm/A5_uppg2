import { fetchData } from "../helpers/fetchDataHelper.js";
import "../../styles/footer.scss";

const fetchFooterData = async () => {
    try {
        const response = await fetch('/database/footer.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch data. HTTP status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching footer data:', error);
        return null;
    }
};

const initializeFooter = async () => {
    const footerData = await fetchFooterData();
    if (!footerData) return;

    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Create footer content
    footer.innerHTML = `
        <div class="footer__content">
            <div class="footer__contact">
                <h3>Kontakt</h3>
                <p>Email: ${footerData.contact.email}</p>
                <p>Tel: ${footerData.contact.phone}</p>
            </div>
            <div class="footer__address">
                <h3>Adress</h3>
                <p>${footerData.address.street}</p>
                <p>${footerData.address.city}</p>
            </div>
        </div>
    `;
};

document.addEventListener('DOMContentLoaded', initializeFooter);
