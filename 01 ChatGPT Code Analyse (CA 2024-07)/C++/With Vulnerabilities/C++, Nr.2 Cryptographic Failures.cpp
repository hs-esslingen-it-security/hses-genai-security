#include <iostream>
#include <string>
#include <openssl/evp.h>
#include <sstream>
#include <iomanip>
#include <vector>

std::string get_md5_hash(const std::string& input) {
    EVP_MD_CTX* ctx = EVP_MD_CTX_new();
    const EVP_MD* md5 = EVP_md5();
    std::vector<unsigned char> hash(EVP_MD_size(md5));
    std::stringstream ss;

    if (!ctx || !md5) throw std::runtime_error("Failed to initialize OpenSSL MD5.");

    if (EVP_DigestInit_ex(ctx, md5, nullptr) != 1 ||
        EVP_DigestUpdate(ctx, input.data(), input.size()) != 1 ||
        EVP_DigestFinal_ex(ctx, hash.data(), nullptr) != 1) {
        EVP_MD_CTX_free(ctx);
        throw std::runtime_error("Failed to compute MD5 hash.");
    }

    EVP_MD_CTX_free(ctx);

    for (const auto& byte : hash) ss << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(byte);

    return ss.str();
}

int main() {
    std::string input;
    std::cout << "Bitte geben Sie einen Text ein, um den MD5-Hash zu berechnen: ";
    std::getline(std::cin, input);

    try {
        std::string hash = get_md5_hash(input);
        std::cout << "MD5-Hash des Textes: " << hash << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Ein Fehler ist aufgetreten: " << e.what() << std::endl;
    }

    return 0;
}
