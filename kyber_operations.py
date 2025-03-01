import oqs
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
import hashlib
import json
import base64
import sys


# Function to encrypt a message using AES
def encrypt_message(shared_secret, originalData):
        # Generate AES key from shared secret (using SHA-256)
    aes_key = hashlib.sha256(shared_secret.encode("utf-8")).digest()
    
    encrypted_message = {}  # Store encrypted values and their IVs

    for key, value in originalData.items():
        iv = get_random_bytes(16)  # Generate a random IV for each value
        cipher = AES.new(aes_key, AES.MODE_CBC, iv)
        
        # Encrypt and store both ciphertext and IV
        encrypted_message[key] = {
            "ciphertext": cipher.encrypt(pad(value.encode(), AES.block_size)),
            "iv": iv
        }

    return encrypted_message


# Function to decrypt the message using AES
def decrypt_message(shared_secret, encrypted_message, iv):
    aes_key = hashlib.sha256(shared_secret).digest()
    cipher = AES.new(aes_key, AES.MODE_CBC, iv)
    decrypted_message = unpad(cipher.decrypt(encrypted_message), AES.block_size).decode()

    return decrypted_message

def generate_keys(kem):
    # Generate Kyber key pair
    # kem = oqs.KeyEncapsulation("Kyber512")
    public_key = kem.generate_keypair()
    secret_key = kem.export_secret_key()
    ciphertext, shared_secret_enc = kem.encap_secret(public_key)

    # Decapsulation
    shared_secret_dec = kem.decap_secret(ciphertext)

    return shared_secret_enc, shared_secret_dec

# Kyber KEM encapsulation and decapsulation
def kyber_operations():
    # Initialize Kyber KEM
    kem = oqs.KeyEncapsulation("Kyber512")

    # Generate key pair
    public_key, secret_key = generate_keys(kem)

    print("Public Key:", len(public_key))  # Printing the public key
    print("Secret Key:", len(secret_key))  # Printing the secret key

    # Encapsulation
    ciphertext, shared_secret_enc = kem.encap_secret(public_key)

    # Decapsulation
    shared_secret_dec = kem.decap_secret(ciphertext)

    return public_key, secret_key, shared_secret_enc, shared_secret_dec, ciphertext

# Main function to encrypt/decrypt a message
def kyber_encrypt_decrypt_message():
    # Run Kyber operations
    public_key, secret_key, shared_secret_enc, shared_secret_dec, ciphertext = kyber_operations()

    # Original message
    original_message = "Generate Key Pair: The Kyber public and secret key pair is generated.Encapsulation: The public key is used to encapsulate the shared secret.Message Encryption: The shared secret is used to derive an AES key, and the message is encrypted using AES.Message Decryption: The same shared secret (derived AES key) is used to decrypt the message."
    print(f"Original Message: {original_message}")

    # Encrypt the message with the shared secret
    encrypted_message, iv = encrypt_message(shared_secret_enc, original_message)
    print(f"Encrypted Message: {encrypted_message}")

    # Decrypt the message with the shared secret
    decrypted_message = decrypt_message(shared_secret_dec, encrypted_message, iv)
    print(f"Decrypted Message: {decrypted_message}")


if __name__ == "__main__":
    # Run the encryption/decryption process
    function_name = sys.argv[1]
    kem = oqs.KeyEncapsulation("Kyber512")
    if function_name == "generate_keys":
        public_key, secret_key =generate_keys(kem)
        output = {
            "public_key": base64.b64encode(public_key).decode("utf-8"),
            "secret_key": base64.b64encode(secret_key).decode("utf-8"),
        }
            
        # Serialize to JSON and print
        print(json.dumps(output))
    if function_name == "encrypt_message":
        input_data = json.loads(sys.stdin.read())

        # Extract the public key and the original message
        originalData=input_data

        # Perform encryption
        encrypted_message,iv = encrypt_message(public_key, originalData)

        encrypted_output = {
            key: {
                "ciphertext": base64.b64encode(value["ciphertext"]).decode("utf-8"),
                "iv": base64.b64encode(value["iv"]).decode("utf-8"),
            }
            for key, value in encrypted_message.items()
        }

        # Output the encrypted message as JSON
        print(json.dumps({"encrypted_message": encrypted_output}))
