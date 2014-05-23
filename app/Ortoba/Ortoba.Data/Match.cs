using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ortoba.Data
{
    class Match
    {
        public Match()
        {
            
        }

        public int Id { get; set; }
        public string Teamname1 { get; set; }
        public string Teamname2 { get; set; }
        public int ScoreTeam1 { get; set; }
        public int ScoreTeam2 { get; set; }
    }
}
