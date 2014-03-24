using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ortoba.Data;

namespace ViewTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var teams = ApiManagement.Instance.GetTeams("http://127.0.0.1/BitBucket/ortoba/core.php/team/all");
            

            foreach (Team team in teams)
            {
                Console.WriteLine(team.Name);
            }

            Console.Read();
        }
    }
}
