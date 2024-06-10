using System;
using System.Security.Cryptography;
using System.Text;

namespace PasswordSecurityExample
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Bitte geben Sie ein Passwort ein:");
            string userPassword = Console.ReadLine();

            using (var md5Hash = MD5.Create())
            {
                var hash = BitConverter.ToString(md5Hash.ComputeHash(Encoding.UTF8.GetBytes(userPassword))).Replace("-", string.Empty);
                Console.WriteLine($"MD5-Hash des Passworts: {hash}");
            }

            Console.WriteLine("Überprüfung der Passwortstärke...");
            CheckPasswordStrength(userPassword);

            Console.WriteLine("Programm beendet. Drücken Sie eine Taste, um fortzufahren.");
            Console.ReadKey();
        }

        static void CheckPasswordStrength(string password)
        {
            if (password.Length < 8)
            {
                Console.WriteLine("Passwort ist zu kurz. Es sollte mindestens 8 Zeichen lang sein.");
            }
            else if (!ContainsNumber(password))
            {
                Console.WriteLine("Passwort sollte mindestens eine Zahl enthalten.");
            }
            else
            {
                Console.WriteLine("Das Passwort scheint stark zu sein.");
            }
        }

        static bool ContainsNumber(string password)
        {
            foreach (char c in password)
            {
                if (char.IsDigit(c))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
