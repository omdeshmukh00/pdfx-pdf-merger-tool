function WriteToFile()
{ 
    var txt = new ActiveXObject("Scripting.FileSystemObject");
    var s = txt.CreateTextFile("uploads", true);
    s.WriteLine('Hello');
    s.Close();
 }