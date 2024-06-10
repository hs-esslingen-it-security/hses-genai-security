#include <iostream>
#include <string>
#include <cstring>

std::string get_sha256(const std::string& input) {
    EVP_MD_CTX* ctx = EVP_MD_CTX_new();
    const EVP_MD* sha256 = EVP_sha256();
    std::vector<unsigned char> hash(EVP_MD_size(sha256));
    std::stringstream ss;

    if (!ctx || !sha256) throw std::runtime_error("Failed to initialize OpenSSL SHA-256.");

    if (EVP_DigestInit_ex(ctx, sha256, nullptr) != 1 ||
        EVP_DigestUpdate(ctx, input.data(), input.size()) != 1 ||
        EVP_DigestFinal_ex(ctx, hash.data(), nullptr) != 1) {
        EVP_MD_CTX_free(ctx);
        throw std::runtime_error("Failed to compute SHA-256 hash.");
    }

    EVP_MD_CTX_free(ctx);

    for (const auto& byte : hash) ss << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(byte);

    return ss.str();
}