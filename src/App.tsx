import { fields } from "./data";
import { RenderFields } from "./RenderFields";

function App() {
  return (
    <div>
      <h3>Render</h3>
      <hr />
      <RenderFields fields={fields} />;
    </div>
  );
}

export default App;
