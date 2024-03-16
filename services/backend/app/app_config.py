import json
from typing import Optional, Tuple, Any, Dict
from pathlib import Path

from pydantic_settings import BaseSettings
from pydantic import PrivateAttr
from pydantic.env_settings import SettingsSourceCallable

class MyConfig(BaseSettings):
    x: int
    y: str

    _file: Optional[str] = PrivateAttr()

    def __init__(self, file=None, *args, **kwargs):
        self._file = file
        super().__init__(*args, **kwargs)

    @staticmethod
    def _json_config_settings(settings: "MyConfig") -> Dict[str, Any]:
        if settings._file:
            return json.loads(Path(settings._file).read_text())
        return {}
    
    class Config:
        def customise_sources(
            init_settings: SettingsSourceCallable,
            env_settings: SettingsSourceCallable,
            file_secret_settings: SettingsSourceCallable,
        ) -> Tuple[SettingsSourceCallable, ...]:
            return (
                init_settings,
                env_settings,
                MyConfig._json_config_settings,
                file_secret_settings,
            )

a = MyConfig(file="conf_a.json")
# b = MyConfig(file="conf_b.json")
nofile = MyConfig(x=99, y="foo")
print(a)
# print(b)
print(nofile)